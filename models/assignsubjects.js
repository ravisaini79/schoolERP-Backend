// models/assignSubject.model.js

const mongoose = require("mongoose");

const assignSubjectSchema = new mongoose.Schema({
  student_id: {type: mongoose.Schema.Types.ObjectId, ref: "students",required: true,},
  user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  subject_ids: [{type: mongoose.Schema.Types.ObjectId,ref: "Subjects"}],
  class_id: {type: mongoose.Schema.Types.ObjectId,ref: "classes",required: true},
  subject_group_id: {type: mongoose.Schema.Types.ObjectId,ref: "SubjectGroup",required: true},
  createdAt: {type: Date,default: Date.now},
});

module.exports = mongoose.model("AssignSubject", assignSubjectSchema);
