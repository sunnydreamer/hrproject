const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const documentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  documentType: { type: String, required: true },
  document: { type: String, default: ""  },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    required: true,
  },
  comment: { type: String, default: ""  },
});

const Document = model("Document", documentSchema);

module.exports = Document;
