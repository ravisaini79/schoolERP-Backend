const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const DepartmentSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("departments", DepartmentSchema);
