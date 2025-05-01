const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const NotificationsSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    receiver: {
      type: [],
      default: "All",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notices", NotificationsSchema);
