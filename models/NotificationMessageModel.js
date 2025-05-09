const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const NotificationsSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    date: {
      type: Date,
      default: Date.now,
    },
    sender: {
      type: String,
    },
    isSend: {
      type: Boolean,
      default: false,
    },
    messageID: {
      type: String,
    },
    receiver: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("newMessage", NotificationsSchema);
