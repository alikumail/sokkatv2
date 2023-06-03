const express = require('express');
const router = express.Router();

// Import the  Controller
const Controller = require('../controllers/FAQsController');

// Define the routes
router.get('/', Controller.getAllFaqs);
router.get('/:id',  Controller.getFaqById);
router.post('/',  Controller.createFaq);
router.put('/:id',  Controller.updateFaq);
router.delete('/:id',  Controller.deleteFaq);

module.exports = router;
