/**
 * MongoDB Score Model
 * 
 * This file defines the Mongoose schema for storing player scores.
 * Currently prepared for future backend integration.
 * 
 * To use this model in the future:
 * 1. Set up Express server
 * 2. Connect to MongoDB using the config file
 * 3. Import this model in your routes/controllers
 * 4. Create API endpoints for CRUD operations
 */

const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Index for faster queries
scoreSchema.index({ points: -1 }); // For leaderboard queries
scoreSchema.index({ username: 1, date: -1 }); // For user history

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;

/**
 * FUTURE USAGE EXAMPLES:
 * 
 * // Create a new score
 * const newScore = new Score({
 *   username: 'Player1',
 *   points: 1500
 * });
 * await newScore.save();
 * 
 * // Get top 10 scores (leaderboard)
 * const leaderboard = await Score.find()
 *   .sort({ points: -1 })
 *   .limit(10);
 * 
 * // Get user's personal best
 * const personalBest = await Score.findOne({ username: 'Player1' })
 *   .sort({ points: -1 });
 * 
 * // Get user's score history
 * const userHistory = await Score.find({ username: 'Player1' })
 *   .sort({ date: -1 })
 *   .limit(20);
 */
