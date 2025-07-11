const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const DormitoriesSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dormitories", DormitoriesSchema);
