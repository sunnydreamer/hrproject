const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const documentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign Key
  documentType: { type: String, required: true },
  document: { type: String },
  status: {
    type: String,
    enum: ['Approved', 'Pending', 'Rejected'],
    required: true
  },
  comment: { type: String }
});

const Document = model("Document", documentSchema);

module.exports = Document;
