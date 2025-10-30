const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received registration request:', req.body);
  if (!username || !password) {
    console.error('Registration error: Missing username or password');
    return res.status(400).json({ error: 'Username and password required.' });
  }
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      console.error('Registration error: Username already exists:', username);
      return res.status(409).json({ error: 'Username already exists.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    try {
      await user.save();
      console.log('User registered and saved to DB:', user);
      res.json({ success: true, username: user.username });
    } catch (saveErr) {
      console.error('Error saving user to DB:', saveErr);
      res.status(500).json({ error: 'Error saving user to database.' });
    }
  } catch (e) {
    console.error('Registration failed:', e);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required.' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });
    // Issue JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );
    res.json({ success: true, token, username: user.username });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;
