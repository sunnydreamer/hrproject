const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const emergencyContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  phone: {
    cell: { type: String, required: true },
    work: { type: String },
  },
  email: { type: String, required: true },
  relationship: { type: String, required: true },
});

const EmergencyContact = model("EmergencyContact", emergencyContactSchema);

module.exports = EmergencyContact;
