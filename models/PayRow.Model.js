const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const PayrowSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    type: {
      type: String,
      default: "pay",
    },
    name: String,
    code: String,
    salary: String,
    allowance: String,
    bonus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("payrow", PayrowSchema);
