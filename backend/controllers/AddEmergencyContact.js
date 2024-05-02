const EmergencyContact = require("../models/emergencyContactModel");

const AddEmergencyContact = async (req, res) => {
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

module.exports = AddEmergencyContact;
