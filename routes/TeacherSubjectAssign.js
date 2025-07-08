const express = require("express");
const router = express.Router();
const Assignment = require("../models/TeacherSubjectAssign");

// Assign subject/class/period to teacher
router.post("/assign", async (req, res) => {
  try {
    const newAssign = new Assignment(req.body);
    await newAssign.save();
    res.status(200).json({ message: "Assignment saved", data: newAssign });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign", error });
  }
});

// Get all assignments for one teacher
router.get("/byteacher/:teacherId", async (req, res) => {
  try {
    const data = await Assignment.find({ teacher_id: req.params.teacherId })
      .populate("class_id", "name")
      .populate("section_id", "name")
      .populate("subject_id", "subject_name")
      .lean();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assignments", err });
  }
});

module.exports = router;