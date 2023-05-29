const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Add an item to the cart
router.post('/', cartController.addCart);

// Get the cart contents
router.get('/', cartController.getCart);

// Update the quantity of an item in the cart
router.put('/:itemId', cartController.updateCart);

// Remove an item from the cart
// router.delete('/:itemId', cartController.removeCartItem);

// Clear the entire cart
router.delete('/', cartController.deleteCart);

module.exports = router;
