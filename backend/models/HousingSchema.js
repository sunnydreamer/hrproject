const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const housingSchema = new Schema({
  house: {
    address: {
      street: { type: String, required: true },
      streetLine2: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    roommates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

const Housing = model("Housing", housingSchema);

module.exports = Housing;
