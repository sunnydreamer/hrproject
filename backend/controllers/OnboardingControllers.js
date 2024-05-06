const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");
const { awsS3Upload } = require("./UserController");
const Document = require("../models/documentModel");
const mongoose = require("mongoose");

const fetchUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: `66340b072e4abd1b0fe284c8` });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (errpr) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { userId, userInfo } = req.body;

    // change userInfo into json object
    const userInfoObject = JSON.parse(userInfo);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // update other user info
    const updateUser = await User.findByIdAndUpdate(userId, userInfoObject);

    if (!updateUser) {
      return res.status(400).send({ message: `failed to update user` });
    }

    // upload file to aws3
    const uploadedFile = req.file;
    if (!uploadedFile) {
      //when no document, just return the function
      res.status(200).json({ message: "Successfully updated the user" });
      return;
    }

    // send to aws and get the aws file location
    const s3Location = await awsS3Upload(
      uploadedFile.path,
      uploadedFile.filename
    );

    const newDocument = new Document({
      userId: userId,
      documentType: "receipt",
      document: s3Location,
      status: "Pending",
      comment: "",
    });
    await newDocument.save();
    //find user and store that under opt
    user.opt["receipt"] = newDocument._id;
    await user.save();

    res.status(200).json({ message: "Successfully updated the user" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addEmergencyContact = async (req, res) => {
  try {
    const { newContact } = req.body;

    const addNewContact = await EmergencyContact.create(newContact);

    addNewContact
      ? res.status(201).send(addNewContact)
      : res.status(400).send({ message: `Could not create contact` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchEmergencyContacts = async (req, res) => {
  try {
    const { contactIdList } = req.body;
    const fetchedContacts = [];

    for (let i = 0; i < contactIdList.length; i++) {
      const contact = await EmergencyContact.findById(contactIdList[i]);
      fetchedContacts.push(contact);
    }

    res.send(fetchedContacts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userId, userInfo } = req.body;

    const updateUser = await User.findByIdAndUpdate(userId, userInfo);
    if (!updateUser) {
      return res.status(400).send({ message: `failed to update user` });
    }

    res.status(200).send({ message: "Successfully updated the user" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  fetchUserById,
  updateUserInfo,
  addEmergencyContact,
  fetchEmergencyContacts,
  fetchAllUsers,
  updateUserStatus,
};
