const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
