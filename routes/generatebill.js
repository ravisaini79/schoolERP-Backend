// routes/billRoutes.js
const express = require("express");
const router = express.Router();
const Bill = require("../models/generatebill");

// POST API to add a new bill
router.post("/createbill", async (req, res) => {

    console.log('bodn',req.body)
  try {
    const { studentId, userId, billItems } = req.body;

    // Validate input data
    if (!studentId || !schoolId || !Array.isArray(billItems) || billItems.length === 0) {
      return res.status(400).json({ error: "Missing required fields or invalid data." });
    }

    // Create a new bill
    const newBill = new Bill({
      studentId,
      userId,
      billItems,
    });

    // Calculate total amount before saving
    newBill.calculateTotalAmount();

    // Save the bill
    await newBill.save();

    return res.status(201).json({
      message: "Bill added successfully",
      bill: newBill,
    });
  } catch (error) {
    console.error("Error adding bill:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET API to get a bill by ID
router.get("/getBill/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate("studentId schoolId"); // Populate student and school details

    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    return res.status(200).json({ bill });
  } catch (error) {
    console.error("Error getting bill:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// PUT API to update a bill by ID
router.put("/updateBill/:id", async (req, res) => {
  try {
    const { billItems } = req.body;

    if (!Array.isArray(billItems) || billItems.length === 0) {
      return res.status(400).json({ error: "Invalid bill items" });
    }

    // Find the bill by ID
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    // Update bill items and recalculate total amount
    bill.billItems = billItems;
    bill.calculateTotalAmount();

    // Save updated bill
    await bill.save();

    return res.status(200).json({
      message: "Bill updated successfully",
      bill,
    });
  } catch (error) {
    console.error("Error updating bill:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// DELETE API to delete a bill by ID
router.delete("/deleteBill/:id", async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    return res.status(200).json({
      message: "Bill deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bill:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
