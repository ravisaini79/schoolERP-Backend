const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ActivitySchema = new Schema(
  {
    
 user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    activity: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ativity", ActivitySchema);
