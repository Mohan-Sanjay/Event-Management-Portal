const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user (Organizer or Admin)
const registerUser = async (req, res) => {
  const { name, email, password, role, hall } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // Create new user
  const newUser = new User({
    name,
    email,
    password,
    role,
    hall: role === 'admin' ? hall : null,  // Only admins have a hall
  });

  try {
    // Hash password before saving
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

  res.status(200).json({ token, user });
};

module.exports = { registerUser, loginUser };
