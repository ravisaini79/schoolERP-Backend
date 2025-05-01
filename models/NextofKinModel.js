const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const NextofKinchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    address: {
      type: String,
    },
    telephone: {
      type: String,
    },
    occupation: {
      type: String,
    },
    relationship: {
      String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nextofkins", NextofKinchema);
