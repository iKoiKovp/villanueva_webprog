const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Get all users
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude the password field
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new user
// @route   POST /api/users
const createUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Create the user with the hashed password
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete user record
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token (With Role Restrictions)
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 2. Account Status Validation
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    // ENHANCEMENT 1: Block 'viewer' accounts from accessing the system entirely
    if (user.type === 'viewer') {
      return res.status(403).json({ 
        message: 'Access Denied: Viewer roles are restricted from logging into the management system.' 
      });
    }

    // 3. Verify Password Matching
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4. Generate JWT Payload including account type permissions
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ 
      message: 'Login successful', 
      token, 
      type: user.type, 
      firstName: user.firstName 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// All 5 functions are now properly matched here:
module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };