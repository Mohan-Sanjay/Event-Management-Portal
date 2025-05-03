const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = {
  hall1Event: global.hall1Conn.model('Event', eventSchema),
  hall2Event: global.hall2Conn.model('Event', eventSchema),
  hall3Event: global.hall3Conn.model('Event', eventSchema),
};
