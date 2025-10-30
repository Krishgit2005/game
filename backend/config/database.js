/**
 * MongoDB Database Configuration
 * 
 * This file contains the database connection logic.
 * Currently prepared for future backend integration.
 * 
 * To use this configuration:
 * 1. Create a .env file in your backend root
 * 2. Add: MONGODB_URI=mongodb://localhost:27017/polydash
 *    (or use MongoDB Atlas connection string)
 * 3. Install required packages: npm install mongoose dotenv
 * 4. Import and call connectDB() in your server.js
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection URI - should be in environment variables
    // For local development: mongodb://localhost:27017/polydash
    // For production: Use MongoDB Atlas connection string
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/polydash';
    
    const conn = await mongoose.connect(mongoURI, {
      // These options help prevent deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not exit the process here so the server can still run in environments
    // where MongoDB is not available. Routes should handle DB unavailability.
    return null;
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;

/**
 * FUTURE USAGE IN SERVER.JS:
 * 
 * require('dotenv').config();
 * const express = require('express');
 * const connectDB = require('./config/database');
 * 
 * const app = express();
 * 
 * // Connect to MongoDB
 * connectDB();
 * 
 * // Middleware and routes...
 * 
 * const PORT = process.env.PORT || 5000;
 * app.listen(PORT, () => {
 *   console.log(`Server running on port ${PORT}`);
 * });
 */
