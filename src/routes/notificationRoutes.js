// backend/routes/notificationRoutes.js

import express from 'express';
const router = express.Router();
const { createNotification, getNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

// Create and get notifications (protected routes)
router.post('/', protect, createNotification);
router.get('/', protect, getNotifications);
router.put('/:id', protect, markAsRead);

module.exports = router;
