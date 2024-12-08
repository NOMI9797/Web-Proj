// backend/src/controllers/authController.js

import User from '../models/User.js';  // Ensure User model is correctly defined and imported
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Controller function for registering a user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log(`Incoming request: ${req.method} ${req.url}`);
    
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Validate the role (ensure it's 'customer', 'seller', or 'admin')
    if (!['customer', 'seller', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role 
    });

    // Generate JWT token for the newly registered user
    const token = generateToken(newUser._id);

    // Return the token and user data (excluding password)
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed, please try again' });
  }
};

// Controller function for logging in a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for the authenticated user
    const token = generateToken(user._id);

    // Return the token and user data (excluding password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed, please try again' });
  }
};
