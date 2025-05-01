const mongoose = require("../config/mongodb");
const { Schema } = mongoose;

const CanteenSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
      required: true,
    },
    classID: {
      type: String,
    },
    memberID: {
      type: String,
    },
    userID: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    payments: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now,
          },
          receipt: String,
          amount: String,
          covers: String,
        },
      ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("canteen", CanteenSchema);
