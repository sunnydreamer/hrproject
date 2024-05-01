const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const housingReportSchema = new Schema({

      title: { type: String },
      description: { type: String },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open",
      },
      timestamp: {
        type: Date,
        default: Date.now
        },
      // think carefully about this... do we want infinite 
      housingComments: [{
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
        }]
});

const HousingReport = model("HousingReport", housingReportSchema);

module.exports = HousingReport;
