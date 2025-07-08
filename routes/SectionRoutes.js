const express = require("express");
const Section = require("../models/SectionModel");

const route = express.Router();

//get all events
route.get("/:schoolId", async (req, res) => {
  try {
    const docs = await Section.find({ user_Id: req.params.schoolId }).sort({
      createdAt: "desc",
    });
    res.json(docs || []);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

//search event by name
// Add this route to your existing sectionsRoutes.js
route.get("/school/:schoolId", async (req, res) => {
  try {
    const docs = await Section.find({ user_Id: req.params.schoolId }).sort({
      createdAt: "desc",
    });
    res.json(docs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await Section.findOne({ _id: req.params.id })
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, doc });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;

  console.log(body,'>>>>>>.')

  //create id
  Section.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Section.findOneAndUpdate(
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
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "something when wrong" });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  Section.findOneAndRemove({
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
