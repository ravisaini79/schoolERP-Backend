const express = require("express");
const router = express.Router();
const SchoolSubbranch = require("../models/SchoolModel");
const { role } = require("../middlewares/variables");
// Create Subbranch
router.post("/", async (req, res) => {
  try {
    const subbranch = await SchoolSubbranch.create(req.body);
    res.status(201).json(subbranch);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || "Failed to create subbranch" });
  }
});



// Get Subbranch by ID
router.get("/:id", async (req, res) => {
  try {
    const subbranch = await SchoolSubbranch.findById(req.params.id);
    if (!subbranch) {
      return res.status(404).json({ error: "Subbranch not found" });
    }
    res.status(200).json(subbranch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subbranch" });
  }
});


// Get Subbranch by User_ID and role = Admin
router.get("/sub/:uid", async (req, res) => {
    try {
      const subbranch = await SchoolSubbranch.find({
        user_Id: req.params.uid,
  
    });

    let allRec = subbranch.filter((item)=>item.role === role.Admin)
  
      if (!allRec || allRec.length === 0) {
        return res.status(200).json([]);
      }
  
      res.status(200).json(allRec);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch subbranch" });
    }
  });
  
  

// Update Subbranch
router.put("/:id", async (req, res) => {
  try {
    const updatedSubbranch = await SchoolSubbranch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSubbranch) {
      return res.status(404).json({ error: "Subbranch not found" });
    }
    res.status(200).json(updatedSubbranch);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || "Failed to update subbranch" });
  }
});

// Delete Subbranch
router.delete("/:id", async (req, res) => {
  try {
    const deletedSubbranch = await SchoolSubbranch.findByIdAndDelete(req.params.id);
    if (!deletedSubbranch) {
      return res.status(404).json({ error: "Subbranch not found" });
    }
    res.status(200).json({ message: "Subbranch deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete subbranch" });
  }
});

module.exports = router;