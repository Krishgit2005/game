# PolyDash Backend

This folder contains the MongoDB schema and configuration files for future backend integration.

## Current Status

The backend structure is **prepared but not yet connected**. The game currently runs entirely in the React frontend without requiring a backend.

## Files

- `models/Score.js` - Mongoose schema for storing player scores
- `config/database.js` - MongoDB connection configuration

## Future Implementation

To implement the full backend:

### 1. Install Dependencies

```bash
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

### 2. Create Server File

Create `backend/server.js`:

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Score = require('./models/Score');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes

// Get leaderboard (top 10 scores)
app.get('/api/scores/leaderboard', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ points: -1 })
      .limit(10);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's personal best
app.get('/api/scores/user/:username', async (req, res) => {
  try {
    const personalBest = await Score.findOne({ 
      username: req.params.username 
    }).sort({ points: -1 });
    res.json(personalBest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit new score
app.post('/api/scores', async (req, res) => {
  try {
    const { username, points } = req.body;
    const newScore = new Score({ username, points });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Create .env File

Create `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/polydash
PORT=5000
```

For production, use MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/polydash?retryWrites=true&w=majority
```

### 4. Update package.json Scripts

Add to `backend/package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 5. Integrate with React Frontend

In your React components, use fetch or axios to communicate with the backend:

```javascript
// Submit score after game over
const submitScore = async (username, points) => {
  try {
    const response = await fetch('http://localhost:5000/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, points })
    });
    const data = await response.json();
    console.log('Score saved:', data);
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

// Fetch leaderboard
const fetchLeaderboard = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/scores/leaderboard');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};
```

### 6. Run the Backend

```bash
cd backend
npm run dev
```

## Notes

- The game logic remains unchanged in the React frontend
- Backend is only for storing and retrieving scores
- Can be deployed separately (e.g., backend on Heroku, frontend on Vercel)
- Remember to update CORS settings in production
