const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // organizer, hall1_admin, hall2_admin, hall3_admin
});

let User;
if (global.userConn) {
  User = global.userConn.model("User", userSchema);
} else {
  throw new Error("User DB not connected yet.");
}

module.exports = User;
