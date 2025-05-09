const express = require("express");
const router = express.Router();
const Subject = require("../models/SubjectMaster");

// ✅ Create subject
router.post("/create", async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all subjects or filter by user_Id or _id
router.get("/getAll/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    const subjects = await Subject.find({ user_Id: userId });

    if (!subjects || subjects.length === 0) {
      return res.status(200).json({ message: "No subjects found for this user." });
    }

    res.status(200).json({ data: subjects || [], status: true });

  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ✅ Get single subject by ID (route param)
router.get("/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update subject by ID
router.put("/:id", async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete subject by ID
router.delete("/:id", async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
