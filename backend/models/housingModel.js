const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const housingSchema = new Schema({
    address: {
      street: { type: String, required: true },
      streetLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    roommates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    housingReport: [{ type: mongoose.Schema.Types.ObjectId, ref: "HousingReport" }]

});

const Housing = model("HousingReport", housingSchema);

module.exports = Housing;
