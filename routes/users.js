const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// Register a new user
router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // You should hash the password in a real application
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login a user (you should implement authentication logic here)
router.post('/login', (req, res) => {
  // Authentication logic goes here
  res.json({ message: 'Login endpoint' });
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;
