const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 * Connection is non-blocking — the app works without a DB
 * (history features will gracefully degrade).
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/calculus-simulator';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Fail fast if Mongo is unavailable
    });
    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn('⚠ MongoDB connection failed — history features disabled.');
    console.warn(`  Reason: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;
