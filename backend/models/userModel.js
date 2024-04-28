const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePicture: { type: String },
  email: { type: String, required: true, unique: true, immutable: true },
  ssn: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "n/a"], required: true },
  address: {
    street: { type: String, required: true },
    streetLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  phone: {
    cell: { type: String, required: true },
    work: { type: String },
  },
  carInfo: {
    make: { type: String },
    model: { type: String },
    color: { type: String },
  },
  emergencyContact: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EmergencyContact" },
  ],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHR: { type: Boolean, required: true },
  hasDriversLicense: { type: Boolean, default: false },
  driversLicense: {
    licenseNumber: { type: String },
    expirationDate: { type: Date, default: null },
    licenseImage: { type: String },
  },
  workAuthorization: {
    type: String,
    enum: ["citizen", "green card", "H1B", "F1", "H4", "other"],
  },
  opt: {
    receipt: { type: String },
    ead: { type: String },
    i983: { type: String },
  },
  visa: {
    visaTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  reference: {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    preferredName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String },
  },
  housingReport: {
    title: { type: String },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    address: {
      street: { type: String },
      streetLine2: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
  },
  timestamp: { type: Date, default: Date.now },
  housingComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  roommates: [
    {
      name: { type: String },
      phone: { type: String },
    },
  ],
});

const User = model(`User`, userSchema);

module.exports = User;
