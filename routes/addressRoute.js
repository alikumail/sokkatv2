const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

// Create a new address
router.post('/', addressController.createAddress);

// Get an address by ID
router.get('/:id', addressController.getAddress);

// Update an address by ID
router.put('/:id', addressController.updateAddress);

// Delete an address by ID
router.delete('/:id', addressController.deleteAddress);

module.exports = router;
