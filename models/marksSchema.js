const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
  user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "students", required: true },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects", required: true },
  total_marks: { type: Number, required: true },
  obtained_marks: { type: Number, required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: "classes", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Mark", MarkSchema);
