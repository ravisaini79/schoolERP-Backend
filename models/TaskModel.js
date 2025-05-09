const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    teacherID: String,
    courseID: String,
    classID: String,
    score: String,
    taskData: String,
    date: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", TaskSchema);
