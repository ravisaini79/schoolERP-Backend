const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ClassesSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
      required: true,
    },
    teacherID: {
      type: String,
    },
    classCode: {
      type: String,
      required: true,
    },
    campusID: {
      type: String,
    },
    division: {
      type: String,
    },
    academic: {
      type: String,
    },
    group: {
      type: String,
    },
    prefect: {
      type: String,
    },
    sba: {
      type: Boolean,
    },
    sbaStaff: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    past: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("classes", ClassesSchema);
