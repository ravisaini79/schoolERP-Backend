const express = require("express");
const mongoose = require("mongoose");  // <-- Added this line
const CampusModel = require("../models/CampusesModel");

const route = express.Router();

// Get all campuses
route.get("/", async (req, res) => {
  try {
    const docs = await CampusModel.find().sort({
      createdAt: "desc",
    });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get one campus by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: id");
  }
  try {
    const doc = await CampusModel.findOne({ _id: req.params.id });
    if (doc) {
      return res.json({ success: true, doc });
    } else {
      return res.json({ success: false, error: "Does not exist" });
    }
  } catch (err) {
    return res.json({ success: false, error: "Server error" });
  }
});

// Create campus
route.post("/create", async (req, res) => {
  try {
    const { name, location, schoolId } = req.body;

    if (!name || !schoolId) {
      return res.status(400).json({ 
        success: false, 
        error: "Name and schoolId are required" 
      });
    }

    const doc = await CampusModel.create({
      name,
      location,
      user_Id: schoolId, // Map schoolId to user_Id
    });

    res.json({ success: true, doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Example backend route for fetching campuses by school
route.get("/school/:schoolId", async (req, res) => {
  try {
    const campuses = await CampusModel.find({ user_Id: req.params.schoolId });
    res.json(campuses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campuses" });
  }
});

// Edit campus
route.put("/update/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: id");
  }

  try {
    const doc = await CampusModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!doc) {
      return res.json({ success: false, error: "Does not exist" });
    }
    return res.json({ success: true, doc });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: "Failed to edit" });
  }
});

// Delete campus
route.delete("/delete/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: id");
  }

  try {
    const doc = await CampusModel.findOneAndRemove({ _id: req.params.id });
    res.json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = route;
