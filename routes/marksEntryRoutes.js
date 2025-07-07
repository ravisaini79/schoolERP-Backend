const express = require("express");
const router = express.Router();
const Mark = require("../models/marksSchema");

// POST /marks/submit - create multiple marks entries
router.post("/submit", async (req, res) => {
  try {
    const marksArray = req.body; // expecting an array of marks objects

    if (!Array.isArray(marksArray) || marksArray.length === 0) {
      return res
        .status(400)
        .json({ message: "Marks data must be a non-empty array" });
    }

    console.log("marksArray", marksArray);
    // Validate each mark entry (optional, but recommended)
    for (const mark of marksArray) {
      const {
        user_Id,
        student_id,
        subject_id,
        total_marks,
        obtained_marks,
        class_id,
      } = mark;

      if (
        !user_Id ||
        !student_id ||
        !subject_id ||
        !total_marks ||
        !obtained_marks ||
        !class_id
      ) {
        return res
          .status(400)
          .json({ message: "All fields are required in each mark entry" });
      }
    }

    // Insert all marks - add user_Id in each if not provided
    // If your frontend does not send user_Id in each mark, add it from req or session here:
    const userId = req.params.user_Id || req.body.user_Id; // or get from auth token/session if available
    const marksToInsert = marksArray.map((mark) => ({
      user_Id: mark.user_Id || userId,
      student_id: mark.student_id,
      subject_id: mark.subject_id,
      total_marks: mark.total_marks,
      obtained_marks: mark.obtained_marks,
      class_id: mark.class_id,
    }));

    // Save all marks at once
    const savedMarks = await Mark.insertMany(marksToInsert);

    res.status(201).json(savedMarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all marks of a user
router.get("/user/:user_Id", async (req, res) => {
  try {
    const { user_Id } = req.params;
    const marks = await Mark.find({ user_Id })
      .populate("student_id")
      .populate("subject_id")
      .populate("class_id");
    res.json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a mark by ID
router.put("/update/:id", async (req, res) => {
  try {
    const markId = req.params.id;
    const updateData = req.body; // expect { student_id, subject_id, total_marks, obtained_marks, ... }

    const updatedMark = await Mark.findByIdAndUpdate(markId, updateData, {
      new: true, // return the updated document
      runValidators: true, // validate the update against schema
    });

    if (!updatedMark) {
      return res.status(404).json({ message: "Mark not found" });
    }

    res.json(updatedMark);
  } catch (error) {
    console.error("Error updating mark:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add or update mark entry for a user, student, subject, and class (upsert)
router.post("/user/:user_Id/entry", async (req, res) => {
  try {
    const { user_Id } = req.params;
    const { student_id, subject_id, total_marks, obtained_marks, class_id } =
      req.body;

    if (
      !student_id ||
      !subject_id ||
      !total_marks ||
      !obtained_marks ||
      !class_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upsert: If mark already exists for user+student+subject+class, update it
    const filter = { user_Id, student_id, subject_id, class_id };
    const update = { total_marks, obtained_marks };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const mark = await Mark.findOneAndUpdate(filter, update, options);

    res.json(mark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional: Delete a mark by id for a user
router.delete("/user/:user_Id/delete/:id", async (req, res) => {
  try {
    const { user_Id, id } = req.params;
    const deleted = await Mark.findOneAndDelete({ _id: id, user_Id });
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Mark not found or unauthorized" });
    res.json({ message: "Mark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Assuming your route is something like this:
router.get("/getbyclass/:user_Id/:classId", async (req, res) => {
  try {
    const { user_Id, classId } = req.params;
    const marks = await Mark.find({ user_Id, class_id: classId })
      .populate("student_id")
      .populate("subject_id")
      .populate("class_id");
    res.json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/getbystudent/:user_Id/:studentId", async (req, res) => {
  try {
    const { user_Id, studentId } = req.params;

    // Find all marks for the student
    // Assuming marks collection has student_id field
    const marks = await Mark.find({ user_Id, student_id: studentId })
      .populate("student_id")
      .populate("subject_id", "subject_name") // Populate subject name only
      .exec();

    if (!marks) {
      return res
        .status(404)
        .json({ message: "No marks found for this student." });
    }

    res.json(marks);
  } catch (error) {
    console.error("Error fetching marks by student:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
