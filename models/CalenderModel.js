const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const CalendarSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    title: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
    },
    description: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    allDay: {
      type: Boolean,
    },
    day: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("calendar", CalendarSchema);
