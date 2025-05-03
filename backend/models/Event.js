// backend/models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String, // 'YYYY-MM-DD'
  time: String, // e.g. '10:00 AM - 12:00 PM'
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

module.exports = eventSchema;
