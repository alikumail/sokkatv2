const mongoose = require('mongoose');

// Create a schema for the notification
const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
