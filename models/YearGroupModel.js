const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const YearGroupSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("yeargroup", YearGroupSchema);
