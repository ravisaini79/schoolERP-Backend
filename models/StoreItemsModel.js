const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const StoreitemsSchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("storeitems", StoreitemsSchema);
