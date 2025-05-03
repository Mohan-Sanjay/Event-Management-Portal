const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    hall: {
      type: String,
      enum: ['homije baba seminar hall', 'mahatma ganthi seminar hall', 'sir c.v raman seminar hall'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
