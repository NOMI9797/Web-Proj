// backend/controllers/notificationController.js

const Notification = require('../models/Notification');
const User = require('../models/User');

// Create a new notification
exports.createNotification = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const newNotification = new Notification({
      user: userId,
      message,
      read: false,
      createdAt: new Date(),
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create notification' });
  }
};

// Get all notifications for the current user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
};
