const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/polydash', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
// Game-only server: auth and user routes removed in cleanup branch

// Optional debug routes (mount if present)
try { app.use('/api/debug', require('./routes/debug')); } catch (e) {
  console.log('Debug routes not available');
}

const PORT = process.env.PORT || 4000;

// Start server only after DB connection
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
});
