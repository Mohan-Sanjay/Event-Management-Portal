// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["organizer", "admin"] },
  hall: { type: String }, // only for admin: "eie", "eee", "sh"
});

module.exports = mongoose.model("User", userSchema);
