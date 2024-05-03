const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const userSchema = new Schema({
  regToken: { type: String, default: null },
  regLinkToken: { type: String, default: null },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, default: "" },
  preferredName: { type: String, default: "" },
  onboardingStatus: {
    type: String,
    enum: ["Not Started", "Pending", "Approved", "Rejected"],
    default: "Not Started",
  },
  profilePicture: { type: String, default: "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  ssn: { type: String, default: "" },
  dob: { type: Date, default: "" },
  gender: {
    type: String,
    enum: ["male", "female", "n/a"],
    default: "n/a",
  },
  address: {
    street: { type: String, default: "" },
    streetLine2: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
  },
  phone: {
    cell: { type: String, default: "" },
    work: { type: String, default: "" },
  },
  carInfo: {
    make: { type: String, default: "" },
    model: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  visa: {
    visaTitle: { type: String, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  emergencyContact: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EmergencyContact" },
  ],
  username: { type: String, unique: true },
  password: { type: String, default: null },
  isHR: { type: Boolean, default: false },
  hasDriversLicense: { type: Boolean, default: false },
  driversLicense: {
    licenseNumber: { type: String, default: "" },
    expirationDate: { type: Date, default: null },
    licenseImage: { type: String, default: "" },
  },
  workAuthorization: {
    type: String,
    enum: ["citizen", "green card", "H1B", "F1", "H4", "other"],
    default: "",
  },
  workAuthorizationStart: {
    type: Date,
    default: null,
  },
  workAuthorizationEnd: {
    type: Date,
    default: null,
  },
  opt: {
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null },
    ead: { type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null },
    i983: { type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null },
    i20: { type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null },
  },
  visa: {
    visaTitle: { type: String, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  reference: {
    firstName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    preferredName: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    relationship: { type: String, default: "" },
  },
  timestamp: { type: Date, default: Date.now },
  house: { type: mongoose.Schema.Types.ObjectId, ref: "Housing" },
});

const User = model(`User`, userSchema);

module.exports = User;
