const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const DeductionsSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
    },
    amount: {
      type: String,
    },
    staff: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("deductions", DeductionsSchema);
