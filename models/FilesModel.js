const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const FilesSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    topic: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    courseID: {
      type: String,
    },
    classID: {
      type: String,
    },
    senderID: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notes", FilesSchema);
