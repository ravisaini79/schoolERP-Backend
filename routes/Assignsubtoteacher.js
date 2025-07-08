const express = require("express");
const router = express.Router();
const Timetable = require("../models/TeacherSubjectAssign");

// Assign timetable
router.get("/:classId/:sectionId", async (req, res) => {
  try {
    const { classId, sectionId } = req.params;
    const timetable = await Timetable.find({ class_id: classId, section_id: sectionId }).populate("periods.subject_id periods.teacher_id");
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { user_Id, class_id, section_id, subject_group_id, weekday, periods } = req.body;
    const existing = await Timetable.findOne({ class_id, section_id, weekday });

    if (existing) {
      existing.periods = periods;
      await existing.save();
      return res.json({ message: "Timetable updated" });
    }

    const newRecord = new Timetable({ user_Id, class_id, section_id, subject_group_id, weekday, periods });
    await newRecord.save();
    res.json({ message: "Timetable saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get by class-section
router.get("/byclass/:user_Id/:class_id/:section_id", async (req, res) => {
  try {
    const list = await Timetable.find({
      user_Id: req.params.user_Id,
      class_id: req.params.class_id,
      section_id: req.params.section_id
    }).populate("subject_id teacher_id");
    res.send(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get by teacher
router.get("/byteacher/:teacher_id", async (req, res) => {
  try {
    const list = await Timetable.find({ teacher_id: req.params.teacher_id })
      .populate("class_id section_id subject_id");
    res.send(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Unassign
router.delete("/:id", async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.send("Unassigned");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
