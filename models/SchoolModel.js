const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SchoolSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
    },
    fullName: {
      type: String,
    },
    motto: {
      type: String,
    },
    role: {
      type: String,
    },
    userID: {
      type: String,
    },
    resetPassowrdToken: String,
    resetPasswordExpires: Date,
    logo: String,
    address: String,
    photoUrl: String,
    email: String,
    telephone: String,
    password: String,
    pass:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("accounts", SchoolSchema);
