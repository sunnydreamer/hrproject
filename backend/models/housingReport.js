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
      // think carefully about this... do we want infinite 
      housingComments: [{
        username: {
            type: String,
            required: true
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
