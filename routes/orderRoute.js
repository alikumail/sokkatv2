const express = require("express");
const router = express.Router();
const controller = require('../controllers/orderController');

// new order 
router.route('/add').post(controller.createOrder);

// get orders from shopify store
router.route('/:id').get(controller.getOrders);

// cancel order in shopify store
router.route('/:orderId/cancel').put(controller.cancelOrder);

// delete order from shopify store and mongodb
router.route('/:orderId').delete(controller.deleteOrder);

module.exports = router;