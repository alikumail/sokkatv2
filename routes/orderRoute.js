const express = require("express");
const router = express.Router();

const controller = require('../controllers/orderController');

//-------------------- new order ---------------------//
router.route('/').post(controller.createOrder);

//------------------- get order --------------// 
router.route('/:id').get(controller.getOrder);

//---------------- cancel order ---------------------//
router.route('/:id/cancel').put(controller.cancelOrder);

//--------------- delete order ---------------------//
router.route('/:id').delete(controller.deleteOrder);

//--------------- update order ---------------------//
router.route('/:id').put(controller.updateOrder);

//--------------- orders list ---------------------//
router.route('/customer/:id').get(controller.listOrder);

module.exports = router;