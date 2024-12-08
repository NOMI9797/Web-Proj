// backend/controllers/profileController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get current user's profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      businessName: user.businessName, // For sellers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email, password, oldPassword, businessName } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If password change is requested
    if (password) {
      if (!oldPassword || !(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (businessName) user.businessName = businessName; // Only for sellers

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
