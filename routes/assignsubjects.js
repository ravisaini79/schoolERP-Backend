// routes/assignSubject.routes.js

const express = require("express");
const router = express.Router();
const AssignSubject = require("../models/assignsubjects");

const Mark = require("../models/marksSchema");

// Create
router.post("/create", async (req, res) => {
  try {
    const assign = new AssignSubject(req.body);
    await assign.save();
    res.status(201).json({
      status: true,
      message: "Subject assigned to student successfully.",
      data: assign,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Error assigning subject to student.",
      error: err.message,
    });
  }
});

router.get("/getbyclass/:userId/:classId", async (req, res) => {
  const { userId, classId } = req.params;
  const { sectionId } = req.query; // optional

  try {
    const query = {
      class_id: classId,
      user_Id: userId,
      // section:sectionId,
    };

    // if (sectionId) query.section = sectionId;
    console.log("query", sectionId);
    const data = await AssignSubject.find(query)
      .populate("student_id")
      .populate("subject_ids"); // students ke assigned subjects

    console.log("data>>>", data);

    let students = data.filter((i) => i.student_id?.section === sectionId);

    console.log("students>>>", students);

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    const studentIds = students.map((s) => s.student_id._id);
    const marks = await Mark.find({
      student_id: { $in: studentIds },
      class_id: classId,
    })
      .populate("student_id")
      .populate("subject_id");

    res.json({ data: students, marks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students or marks" });
  }
});


router.get("/getbystudent/:userId/:studentId", async (req, res) => {
  try {
    const { userId, studentId } = req.params;
    const marks = await Mark.find({ user_Id: userId, student_id: studentId })
      .populate("subject_id", "subject_name")
      .populate("student_id", "name middleName")
      .lean();

    if (!marks || marks.length === 0) {
      return res.status(404).json({ message: "Marks not found for the student" });
    }

    res.status(200).json(marks);
  } catch (error) {
    console.error("Error fetching student marks:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// POST: submit new marks
router.post("/submit", async (req, res) => {
  const { marks } = req.body; // expect: [{ student_id, subject_id, ... }]

  try {
    if (!Array.isArray(marks) || marks.length === 0) {
      return res.status(400).json({ message: "Marks data is required" });
    }

    await Mark.insertMany(marks);
    res.status(201).json({ message: "Marks submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit marks" });
  }
});

// PUT: update existing marks
router.put("/update/:markId", async (req, res) => {
  const { markId } = req.params;
  const { total_marks, obtained_marks } = req.body;

  try {
    const mark = await Mark.findById(markId);
    if (!mark) return res.status(404).json({ message: "Mark not found" });

    mark.total_marks = total_marks;
    mark.obtained_marks = obtained_marks;
    await mark.save();

    res.json({ message: "Mark updated successfully", mark });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update mark" });
  }
});

// Read All
router.get("/", async (req, res) => {
  try {
    const data = await AssignSubject.find()
      .populate("student_id")
      .populate("user_Id")
      .populate("subject_ids")
      .populate("class_id")
      .populate("subject_group_id");
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
  }
});

router.get("/getby/:userId", async (req, res) => {
  try {
    const { user_Id } = req.params.userId;

    const filter = {};
    if (user_Id) {
      filter.user_Id = user_Id;
    }

    const data = await AssignSubject.find(filter)
      .populate("student_id")
      .populate("user_Id")
      .populate("subject_ids")
      .populate("class_id")
      .populate("subject_group_id");

    res.status(200).json({
      status: true,
      message: "Data fetched successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching data",
      error: err.message,
    });
  }
});

// Read By ID
router.get("/:id", async (req, res) => {
  try {
    const item = await AssignSubject.findById(req.params.id)
      .populate("student_id")
      .populate("user_Id")
      .populate("subject_ids")
      .populate("class_id")
      .populate("subject_group_id");
    if (!item) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(item);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching assignment", error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await AssignSubject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating assignment", error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AssignSubject.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting assignment", error: err.message });
  }
});

module.exports = router;
