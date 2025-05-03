const Event = require('../models/eventModel');
const User = require('../models/userModel');

// Create a new event
const createEvent = async (req, res) => {
  const { title, description, eventTime, hall } = req.body;

  // Check if an event already exists at the requested time for the selected hall
  const existingEvent = await Event.findOne({ eventTime, hall });
  if (existingEvent) return res.status(400).json({ message: 'Event already exists at this time' });

  // Create the event
  const newEvent = new Event({
    title,
    description,
    eventTime,
    hall,
    organizerId: req.user._id
  });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Admin approve/reject event
const updateEventStatus = async (req, res) => {
  const { eventId, status } = req.body;

  // Validate status
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  event.status = status;

  try {
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Get events for admin (based on hall)
const getEventsForAdmin = async (req, res) => {
  const hall = req.user.hall; // Admin is associated with a hall
  const events = await Event.find({ hall });
  res.status(200).json(events);
};

// Get events for organizer (showing status of sent requests)
const getEventsForOrganizer = async (req, res) => {
  const events = await Event.find({ organizerId: req.user._id });
  res.status(200).json(events);
};

module.exports = { createEvent, updateEventStatus, getEventsForAdmin, getEventsForOrganizer };
