const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

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
  const { regLinkToken, regToken } = req.body;
  try {
    const user = await User.findOne({ regLinkToken, regToken });
    if (!user) {
      return res.status(404).json({
        errors: [
          "The registration token you've enter is either invalid or has expired. Please contact your HR representative if you have any questions.",
        ],
      });
    }
    res
      .status(200)
      .json({ email: user.email, message: "Registration Token Vefified." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["500 Internal Server Error"] });
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
  return res.status(200).json({ message: "User registered successfully." });
};

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
    const user = await User.findOne({ email }).select("password").lean().exec();

    if (!user) {
      return res
        .status(401)
        .json({ data: { errors: ["Incorrect Email or Password."] } });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ errors: ["Incorrect Email or Password."] });
    }
    const token = generateJwt(user._id, email);
    console.log("user match!", user._id, email);
    res.cookie("token", token, { httpOnly: true, maxAge: 900000 }); // 15 minutes

    // Todo: check onboarding status and redirect to the correct page
    try {
      const onboardingStatus = await User.findOne({ email }).select("onboardingStatus").lean().exec();
      if (onboardingStatus === "Not Started" || onboardingStatus === "Rejected" || onboardingStatus === "Pending") {
        return res.status(200).json({ navigate: "/user/onboarding" });
      } else if (onboardingStatus === "Approved") {
        return res.status(200).json({ navigate: "/user/info" });
      } else {
        return res.status(200).json({ navigate: "*" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: ["500 Internal Server Error"] });
    }
    // return res.status(200).json({ message: "User logged in successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: ["500 Internal Server Error"] });
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
  console.log("generating token");
  const email = "sunnyli@gmail.com"; // Todo: get email from the request
  const firstName = "Sunny"; // Todo: get first name from the request
  const lastName = "Li"; // Todo: get last name from the request

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
    await User.findOneAndUpdate({ email }, { regLinkToken, regToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["500 Internal Server Error"] });
  }
  return res.status(200).json({ regLinkToken, regToken });
};

module.exports = {
  registrationWithToken,
  register,
  generateAndStoreTokens,
  login,
};
