const express = require("express");
const Dormitories = require("../models/DormitoriesModel");

const route = express.Router();

// Get all dormitories
route.get("/", async (req, res) => {
  const docs = await Dormitories.find().sort({
    createdAt: "desc",
  });
  res.json(docs);
});

// Get dormitories by school (using user_Id)
route.get("/school/:schoolId", async (req, res) => {
  try {
    const docs = await Dormitories.find({ user_Id: req.params.schoolId }).sort({
      createdAt: "desc",
    });
    res.json(docs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await Dormitories.findOne({ _id: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

// Create dormitory
route.post("/create", async (req, res) => {
  let body = req.body;
  Dormitories.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

// Edit dormitory
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Dormitories.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, docs: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "something when wrong" });
    });
});

// Delete dormitory
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Dormitories.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = route;