const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Document = require("../models/documentModel");
const mongoose = require("mongoose");

const fs = require("fs");
const { s3, bucketName } = require("../config/aws");

const getDocuments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // return if they are not F1
    if (user.workAuthorization !== "F1") {
      return res.status(200).json({
        message: "User does not have F1(OPT) work authorization",
        data: null,
      });
    }

    // checking their required documents and get data from Document Collection
    const expectedFields = ["receipt", "ead", "i983", "i20"];
    const documentInfo = {};

    for (const field of expectedFields) {
      if (
        user.opt &&
        user.opt[field] &&
        mongoose.Types.ObjectId.isValid(user.opt[field])
      ) {
        const document = await Document.findById(user.opt[field]);
        if (document) {
          documentInfo[field] = {
            documentType: document.documentType,
            status: document.status,
            comment: document.comment,
          };
          continue;
        }
      }
      documentInfo[field] = null;
    }

    res.status(200).json({
      message: "Retrieve OPT documents successfully",
      data: documentInfo,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const awsS3Upload = async (filePath, newFileNameKey) => {
  // send file to AWS S3
  try {
    const fileStream = fs.createReadStream(filePath);
    const params = {
      Bucket: bucketName,
      Key: newFileNameKey,
      Body: fileStream,
    };
    const data = await s3.upload(params).promise();
    console.log("Success:", data.Location);

    //return the AWS file location
    return data.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const uploadDocuments = async (req, res) => {
  const { userId } = req.params;
  const { documentType } = req.body;

  // check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  //get file from req.file
  const uploadedFile = req.file;
  try {
    // send to aws and get the aws file location
    const s3Location = await awsS3Upload(
      uploadedFile.path,
      uploadedFile.filename
    );

    // create a document in the document collection
    const newDocument = new Document({
      userId: user._id,
      documentType: documentType,
      document: s3Location,
      status: "Pending", //default is pending
      comment: "",
    });
    await newDocument.save();

    // add the reference ID to the user opt
    user.opt[documentType] = newDocument._id;
    await user.save();

    res.json({ success: true, message: "successfully update the document" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file to S3" });
  }
};

/**
 * A helper for generating JWT token using userId and email.
 * @param {*} userId
 * @param {*} email
 * @returns
 */
const generateJwt = (userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

/**
 * registrationWithToken verifies both the registration link token and the registration token.
 * If the user is found, it returns the user's email and a message.
 * If the user is not found, it returns a 404 status code and an error message.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const registrationWithToken = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.errors.map(error => error.msg);
    return res.status(400).json({ errors });
  }
  const regLinkTokenFromUrl = req.params.regLinkTokenFromUrl;
  const { regLinkTokenFromBody, regToken } = req.body;
  console.log("regLinkTokenFromUrl", regLinkTokenFromUrl);
  console.log("regLinkTokenFromBody", regLinkTokenFromBody);
  if (regLinkTokenFromUrl !== regLinkTokenFromBody) {
    console.log("regLinkTokens don't match");
    return res.status(400).json({ errors: ["The registration link is invalid. Please contact your HR representative if you have any questions."] });
  }

  console.log("regLinkTokens match");
  // Helper function to verify JWT
  const verifyToken = async (token, errorMessage) => {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error(errorMessage);
    }
  };

  try {
    // Verify both tokens
    await verifyToken(regLinkTokenFromBody, "The registration link is either invalid or has expired. Please contact your HR representative if you have any questions.");
    await verifyToken(regToken, "The registration token is either invalid or has expired. Please contact your HR representative if you have any questions.");

    // Proceed with finding the user
    const user = await User.findOne({ regLinkToken: regLinkTokenFromBody, regToken });
    if (!user) {
      return res.status(404).json({
        errors: [
          "The registration token you've entered is either invalid or has expired. Please contact your HR representative if you have any questions.",
        ],
      });
    }

    if (!user.regLinkToken || !user.regToken) {
      return res.status(403).json({
        errors: [
          "The registration token you've entered is either invalid or has expired. Please contact your HR representative if you have any questions.",
        ],
      });
    }

    // Success response
    res.status(200).json({ email: user.email, message: "Registration Token Verified." });
  } catch (error) {
    console.error(error.message);
    return res.status(403).json({ errors: [error.message] });
  }
};

/**
 * register validates the user's registration information and register the user.
 * If there are any validation errors, it returns a 400 status code and the errors.
 * If the user is registered successfully, it returns a 200 status code and a success message.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const register = async (req, res) => {
  const errors = [];
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    for (let i = 0; i < validationErrors.errors.length; i++) {
      errors.push(validationErrors.errors[i].msg);
    }
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
      return res.status(409).json({ errors: ["Username already exists."] });
    } else {
      const user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          username: req.body.username,
          password: await bcrypt.hash(
            req.body.password,
            Number(process.env.SALT)
          ),
        }
      );

      user.regLinkToken = null;
      user.regToken = null;
      await user.save();

      return res.status(200).json({ message: "User registered successfully." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["500 Internal Server Error"] });
  }
};

/**
 * login validates the user's login information and logs the user in.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    for (let i = 0; i < validationErrors.errors.length; i++) {
      errors.push(validationErrors.errors[i].msg);
    }
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const user = await User.findOne({ email })
      .select("password onboardingStatus")
      .lean()
      .exec();

    if (!user) {
      return res.status(401).json({ errors: ["Incorrect Email or Password."] });
    }
    // console.log("user.password", user.password);
    if (user.password === null || user.password === undefined) {
      return res
        .status(403)
        .json({ errors: ["Attempted to login before registering."] });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ errors: ["Incorrect Email or Password."] });
    }
    const token = generateJwt(user._id, email);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 900000, // 15 minutes
      // sameSite: 'None', // Fine for local development
      // secure: true, // Comment this out unless you're using HTTPS
      path: "/", // Cookie is available throughout the domain
      // domain: 'localhost' // Generally not needed, and do not include the port number
    });

    if (
      user.onboardingStatus === "Not Started" ||
      user.onboardingStatus === "Rejected" ||
      user.onboardingStatus === "Pending"
    ) {
      return res.status(200).json({ navigate: "/user/onboarding-application" });
    } else if (user.onboardingStatus === "Approved") {
      return res.status(200).json({ navigate: "/user" });
    } else {
      return res.status(500).json({ errors: ["500 Internal Server Error"] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: ["500 Internal Server Error"] });
  }
};

const logout = (req, res) => {
  console.log("Cookies at logout:", req.cookies); // This will log the cookies received at the server
  try {
    res.clearCookie("token", { path: '/' }); // Ensure path matches the setting
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "500 Internal Server Error" });
  }
};


/**
 * generateAndStoreTokens generates registration link token and registration token for the user and updates the database.
 * If the tokens are generated successfully and updated, it returns a 200 status code and the tokens.
 * If there are any errors, it returns a 500 status code and an error message.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const generateAndStoreTokens = async (req, res) => {
  // console.log("generating token");
  const errors = [];
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    for (let i = 0; i < validationErrors.errors.length; i++) {
      errors.push(validationErrors.errors[i].msg);
    }
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const { email, firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ errors: ["Email already exists."] });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: ["400 Bad Request"] });
  }

  const regLinkToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
  const regToken = jwt.sign(
    { email, rand: "x7d12dm5dk" },
    process.env.JWT_SECRET,
    {
      expiresIn: "3h",
    }
  );

  try {
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email,
      isHR: false,
      regLinkToken,
      regToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: ["400 Bad Request"] });
  }

  return res.status(200).json({ regLinkToken, regToken });
};

// const fetchUserData = async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ errors: ["User not found."] });
//     }
//     return res.status(200).json(user);
//   }
//   catch (error) {
//     console.error(error);
//     return res.status(500).json({ errors: ["500 Internal Server Error"] });
//   }
// }
const fetchUserData = async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId)
      .populate('emergencyContact') // Populates the emergency contact references
      .populate({
        path: 'house',
        populate: [
            { path: 'roommates'},
            { path: 'housingReport' } // Populate housingReport for the house
        ]
    });
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["500 Internal Server Error"] });
  }
}


const pushUserData = async (req, res) => {
  const userId = req.body.userId;
  const userData = req.body.userData;
  try {
    const user = await User.findOneAndReplace({ _id: userId }, userData);
    if (!user) {
      return res.status(404).json({ errors: ["User not found."] });
    }
    return res.status(200).json({ message: "User data updated successfully." });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["500 Internal Server Error"] });
  }
}

module.exports = {
  registrationWithToken,
  register,
  generateAndStoreTokens,
  login,
  logout,
  uploadDocuments,
  getDocuments,
  fetchUserData,
  pushUserData
};
