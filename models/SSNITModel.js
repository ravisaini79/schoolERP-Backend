const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SBASchema = new Schema(
  {
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
    year: {
      type: String,
    },
    month: {
      type: String,
    },
    percentage: {
      type: Number,
    },
    teachers: {
      type: [
        {
          userID: String,
          name: String,
          SSNITNumber: String,
          position: String,
          salary: Number,
          contribution: Number,
          grade: String,
          interpretation: String,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ssnit", SBASchema);
