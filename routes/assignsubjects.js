// routes/assignSubject.routes.js

const express = require("express");
const router = express.Router();
const AssignSubject = require("../models/assignsubjects");

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

    const data = await AssignSubject.find(filter).populate("student_id")
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
