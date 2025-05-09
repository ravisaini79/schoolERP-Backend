const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SubjectGroupSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    parent_user: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    group_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subjects' }],  
    status: {
        type: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubjectGroup", SubjectGroupSchema);
