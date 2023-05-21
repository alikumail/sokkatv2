const express = require("express");
const router = express.Router();
const controller = require('../controllers/orderController');

// new order 
router.route('/add').post(controller.createOrder);

// get orders from shopify store
router.route('/').get(controller.getOrders);

module.exports = router;