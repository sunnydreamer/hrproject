const mongoose = require(`mongoose`);
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, default: "" },
  preferredName: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  email: { type: String, required: true, unique: true, immutable: true },
  ssn: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "n/a"], required: true },
  address: {
    street: { type: String, required: true },
    streetLine2: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  phone: {
    cell: { type: String, required: true },
    work: { type: String, default: "" },
  },
  carInfo: {
    make: { type: String, default: "" },
    model: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  visa: {
    visaTitle: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  emergencyContact: [
    { type: mongoose.Schema.Types.ObjectId, ref: "EmergencyContact" },
  ],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHR: { type: Boolean, required: true },
  hasDriversLicense: { type: Boolean, default: false },
  driversLicense: {
    licenseNumber: { type: String, default: "" },
    expirationDate: { type: Date, default: null },
    licenseImage: { type: String, default: "" },
  },
  workAuthorization: {
    type: String,
    enum: ["citizen", "H1B", "F1"],
    required: true,
  },
  workAuthorizationStart:{
    type: Date, default: null
  },
  workAuthorizationEnd:{
    type: Date, default: null
  },
  opt: {
    receipt: { type: String, default: "" },
    ead: { type: String, default: "" },
    i983: { type: String, default: "" },
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
  housingReport:[ {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    housingComments: [{type: String}],
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    address: {
      street: { type: String, default: "" },
      streetLine2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
    },
  } ],
  timestamp: { type: Date, default: Date.now },
  roommates: [
    {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
  ],
  house : [{ type: mongoose.Schema.Types.ObjectId, ref: "Housing" }]
});

const User = model(`User`, userSchema);

module.exports = User;


