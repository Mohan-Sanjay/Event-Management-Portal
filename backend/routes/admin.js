// backend/routes/admin.js
const express = require("express");
const { connections } = require("../config/dbConnections");
const EventSchema = require("../models/Event");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// View pending requests for your hall
router.get("/requests", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not admin" });
  }

  const db = connections[req.user.hall];
  const Event = db.model("Event", EventSchema);

  const pending = await Event.find({ status: "pending" }).populate("organizer", "username");
  res.json(pending);
});

// Approve or reject a request
router.post("/decision", verifyToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not admin" });
  }

  const { eventId, decision } = req.body; // decision: 'approved' | 'rejected'
  const db = connections[req.user.hall];
  const Event = db.model("Event", EventSchema);

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (decision === "approved") {
    const exists = await Event.findOne({ date: event.date, status: "approved" });
    if (exists && exists._id.toString() !== event._id.toString()) {
      return res.status(400).json({ message: "Another event already approved for this date" });
    }
  }

  event.status = decision;
  await event.save();

  res.json({ message: `Event ${decision}` });
});

module.exports = router;
