const User = require("../models/userModel");
const EmergencyContact = require("../models/emergencyContactModel");

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
    const { userInfo } = req.body;
    const updateUser = await User.findByIdAndUpdate(userInfo._id, userInfo);

    updateUser
      ? res.status(200).send(updateUser)
      : res.status(400).send({ message: `failed to update user` });
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

module.exports = { fetchUserById, updateUserInfo, addEmergencyContact };
