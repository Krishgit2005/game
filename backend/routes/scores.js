const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Create a new score entry (username, points)
router.post('/', async (req, res) => {
  const { username, points } = req.body;
  console.log('POST /api/scores body:', req.body);
  // normalize points to number if possible
  const pts = typeof points === 'number' ? points : Number(points);
  if (!username || Number.isNaN(pts)) {
    console.error('Invalid score payload:', { username, points });
    return res.status(400).json({ error: 'username and numeric points are required' });
  }
  try {
    const score = new Score({ username: String(username).trim(), points: Math.max(0, Math.floor(pts)) });
    await score.save();
    console.log('Score saved for user', score.username, 'points', score.points, 'id', score._id);
    res.json({ success: true, id: score._id });
  } catch (e) {
    console.error('Failed to save score:', e);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get leaderboard scores with optional timeframe filter
router.get('/', async (req, res) => {
  const { timeframe } = req.query;
  const query = {};
  
  // Apply timeframe filters
  if (timeframe === 'today') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query.date = { $gte: today };
  } else if (timeframe === 'week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    query.date = { $gte: weekAgo };
  }

  try {
    // Use aggregation to get the highest score per user
    const scores = await Score.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$username',
          points: { $max: '$points' },
          date: { $first: '$date' },
          username: { $first: '$username' }
        }
      },
      { $sort: { points: -1 } },
      { $limit: 100 }
    ]);
    res.json(scores);
  } catch (e) {
    console.error('Failed to fetch scores:', e);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
