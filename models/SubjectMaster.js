const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SubjectsSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    subject_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subject_code: {
      type: String,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subjects", SubjectsSchema);
