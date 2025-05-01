const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const OptionsModel = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    events: {
      type: [
        {
          type: String,
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

module.exports = mongoose.model("optionsdata", OptionsModel);
