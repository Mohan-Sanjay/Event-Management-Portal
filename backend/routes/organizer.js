// backend/routes/organizer.js
const express = require("express");
const { connections } = require("../config/dbConnections");
const EventSchema = require("../models/Event");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Request new event
router.post("/request", verifyToken, async (req, res) => {
  const { hall, date, time, title } = req.body;

  if (req.user.role !== "organizer") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const db = connections[hall];
  const Event = db.model("Event", EventSchema);

  // Check for event conflict on same date
  const existing = await Event.findOne({ date });
  if (existing) {
    return res.status(400).json({ message: "Date already booked" });
  }

  const newEvent = new Event({
    title,
    date,
    time,
    organizer: req.user.id,
  });

  await newEvent.save();
  res.json({ message: "Request submitted" });
});

// View your requests
router.get("/my-requests", verifyToken, async (req, res) => {
  const results = [];

  for (const [hallKey, db] of Object.entries(connections)) {
    const Event = db.model("Event", EventSchema);
    const events = await Event.find({ organizer: req.user.id });
    results.push(...events.map(e => ({ ...e.toObject(), hall: hallKey })));
  }

  res.json(results);
});

module.exports = router;
