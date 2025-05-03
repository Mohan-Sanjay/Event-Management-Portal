const express = require('express');
const { createEvent, updateEventStatus, getEventsForAdmin, getEventsForOrganizer } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Organizer can create an event request
router.post('/create', protect, createEvent);

// Admin can approve/reject events
router.post('/update', protect, updateEventStatus);

// Admin can get events for their hall
router.get('/admin/events', protect, getEventsForAdmin);

// Organizer can get events they've requested
router.get('/organizer/events', protect, getEventsForOrganizer);

module.exports = router;
