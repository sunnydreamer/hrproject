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
      fullName: {type: String, default:"Some name"},
      phone: {type: String, default:"some phone"},
      email: {type: String, default:"some email"},
    },
    tables: {type:Number, required: true, default:1},
    chairs: {type:Number, required: true, default:1},
    beds: {type:Number, required: true, default:1},
    mattresses: {type:Number, required: true, default:1}
});

const Housing = model("Housing", housingSchema);

module.exports = Housing; 

