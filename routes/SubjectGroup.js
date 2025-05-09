const express = require('express');
const router = express.Router();
const SubjectGroup = require('../models/SubjectGroup');

const mongoose = require("mongoose");
// Save a new subject group
router.post("/add", async (req, res) => {
  try {
    const { group_name, description, subjectIds, user_Id } = req.body;

    const newGroup = new SubjectGroup({
      group_name,
      description,
      subjectIds,
      user_Id,
      parent_user:user_Id,
    });

    const savedGroup = await newGroup.save();
    res.json(savedGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Save a new subject group
router.get("/get/:id", async (req, res) => {
  try {
    const subgroup = await SubjectGroup.findById(req.params.id);
    res.json(subgroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await SubjectGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, group: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    await SubjectGroup.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/group/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const groups = await SubjectGroup.find({ user_Id: userId }).populate('subjectIds');

    if (!groups.length) {
      return res.status(404).json({ message: 'No groups found for this user.' });
    }

    res.json({ groups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
