const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ScholarshipsSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    types: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("scholarships", ScholarshipsSchema);
