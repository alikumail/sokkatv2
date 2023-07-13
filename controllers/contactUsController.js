const ContactUs = require('../models/ContactUs');

async function contactUs(req, res){
    const { email, full_name, subject, message } = req.body;

  // Create a new instance of ContactUs
  const contactForm = new ContactUs({
    email: email,
    fullName: full_name,
    subject: subject,
    message: message
  });

  // Save the contact form data to the database
  contactForm.save()
    .then(savedContact => {
      console.log('Saved contact form data:', savedContact);
      res.status(200).json({ message: 'Received your contact form data!' });
    })
    .catch(error => {
      console.error('Error saving contact form data:', error);
      res.status(500).json({ error: 'Failed to save contact form data' });
    });
  };

  module.exports = {
    contactUs
  };