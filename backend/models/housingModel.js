const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const housingSchema = new Schema({
    address: {
      street: { type: String, required: true },
      streetLine2: { type: String, default: ""  },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    roommates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    housingReport: [{ type: mongoose.Schema.Types.ObjectId, ref: "HousingReport" }],
    landlord: {
      fullName: {type: String, required: true, default:""},
      phone: {type: String, required: true, default:""},
      email: {type: String, required: true, default:""},
    }


});

const Housing = model("Housing", housingSchema);

module.exports = Housing; 

