const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const NonBillSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    student: {
      type: String,
    },
    term: {
      type: String,
    },
    year: {
      type: String,
    },
    amount: {
      type: String,
    },
    remarks: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    bank: {
      type: String,
    },
    cheque: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nonbillpayment", NonBillSchema);
