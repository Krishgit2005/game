const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Create a new score entry (username, points)
router.post('/', async (req, res) => {
  const { username, points } = req.body;
  if (!username || typeof points !== 'number') return res.status(400).json({ error: 'username and numeric points are required' });
  try {
    const score = new Score({ username: String(username), points: Math.max(0, Math.floor(points)) });
    await score.save();
    res.json({ success: true, id: score._id });
  } catch (e) {
    console.error('Failed to save score:', e);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Optional: get top scores
router.get('/top/:n?', async (req, res) => {
  const n = Math.min(100, Math.max(1, Number(req.params.n) || 10));
  try {
    const top = await Score.find().sort({ points: -1 }).limit(n).lean();
    res.json({ success: true, top });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
