const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const AcademicYearSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    currentYear: {
      type: String,
    },
    currentTerm: {
      type: String,
    },
    code: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("academicYear", AcademicYearSchema);
