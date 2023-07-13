const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

// Create a new address
router.post('/addCustomerAddress', addressController.createAddress);

// Get an address by ID
router.get('/:id', addressController.getAddress);

// Get an all addresses by ID
router.get('/getAddressList?customer_id', addressController.getAllAddress);

// Update an address by ID
router.put('/updateAddress', addressController.updateAddress);

// Delete an address by ID
router.delete('/removeAddress', addressController.deleteAddress);

module.exports = router;
