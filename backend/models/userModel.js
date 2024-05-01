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
  profilePicture: { type: String, default: "" },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  ssn: { type: String, required: true, default: "" },
  dob: { type: Date, required: true, default: "" },
  gender: {
    type: String,
    enum: ["male", "female", "n/a"],
    required: true,
    default: "n/a",
  },
  address: {
    street: { type: String, required: true, default: "" },
    streetLine2: { type: String, default: "" },
    city: { type: String, required: true, default: "" },
    state: { type: String, required: true, default: "" },
    zip: { type: String, required: true, default: "" },
  },
  phone: {
    cell: { type: String, required: true, default: "" },
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
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHR: { type: Boolean, required: true, default: false },
  hasDriversLicense: { type: Boolean, default: false },
  driversLicense: {
    licenseNumber: { type: String, default: "" },
    expirationDate: { type: Date, default: null },
    licenseImage: { type: String, default: "" },
  },
  workAuthorization: {
    type: String,
    enum: ["citizen", "green card", "H1B", "F1", "H4", "other"],
    default: "citizen",
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
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    ead: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    i983: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    i20: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
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
  housingReport: [
    {
      title: { type: String },
      description: { type: String },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      housingComments: [{ type: String }],
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
  ],
  timestamp: { type: Date, default: Date.now },
  roommates: [
    {
      name: { type: String },
      phone: { type: String },
    },
  ],
  house: [{ type: mongoose.Schema.Types.ObjectId, ref: "Housing" }],
});

const User = model(`User`, userSchema);

module.exports = User;
