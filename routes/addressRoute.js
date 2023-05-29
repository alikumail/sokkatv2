const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

// Create a new address
router.post('/', addressController.createAddress);

// Get an address by ID
router.get('/:id', addressController.getAddress);

// Get an all addresses by ID
router.get('/getAll/:id', addressController.getAllAddress);

// Update an address by ID
router.put('/:id', addressController.updateAddress);

// Delete an address by ID
router.delete('/:id', addressController.deleteAddress);

module.exports = router;
