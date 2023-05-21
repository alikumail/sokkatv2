const mongoose = require('mongoose');
require('dotenv').config();

// Connection URI
const uri = process.env.DB_URI;

// Connect to the MongoDB server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Get a reference to the database
const db = mongoose.connection;

// Handle MongoDB connection events
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connection opened');
});

db.on('close', () => {
  console.log('MongoDB connection closed');
});

// Export the database connection
module.exports = db;
