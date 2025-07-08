const mongoose = require("../config/mongodb");
const { Schema } = mongoose;

const TimetableSchema = new Schema({
  user_Id: { type: Schema.Types.ObjectId, ref: "accounts" },
  class_id: { type: Schema.Types.ObjectId, ref: "classes" },
  section_id: { type: Schema.Types.ObjectId, ref: "sections" },
  subject_group_id: { type: Schema.Types.ObjectId, ref: "subject_groups" },
  weekday: String,
  periods: [
    {
      subject_id: { type: Schema.Types.ObjectId, ref: "subjects" },
      teacher_id: { type: Schema.Types.ObjectId, ref: "teachers" },
      time_from: String,
      time_to: String,
      room_no: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("timetables", TimetableSchema);
