// models/Bill.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BillSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "students", // Reference to the Student collection
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "accounts", // Reference to the School collection
      required: true,
    },
    billItems: [
      {
        item: {
          type: String,
       
        },
        amount: {
          type: Number,
       
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

// Method to calculate the total amount
BillSchema.methods.calculateTotalAmount = function () {
  this.totalAmount = this.billItems.reduce((sum, item) => sum + item.amount, 0);
};

module.exports = mongoose.model("Billing", BillSchema);
