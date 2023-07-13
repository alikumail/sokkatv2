const mongoose = require('mongoose');

// Define the ContactUs schema
const contactUsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
});

// Create the ContactUs model based on the schema
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
