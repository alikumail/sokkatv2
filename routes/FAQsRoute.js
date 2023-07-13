const express = require('express');
const router = express.Router();
// Import the  Controller
const Controller = require('../controllers/FAQsController');
const contact = require('../controllers/contactUsController');

// Define the routes
router.get('/get-faqs', Controller.getFaqs);
router.post('/contactUs', contact.contactUs);

module.exports = router;
