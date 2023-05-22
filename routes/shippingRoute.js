const express = require('express');
const router = express.Router();

const controller = require('../controllers/shippingController');

// GET all shipping methods
router.route('/getall/').get(controller.getAllShippingMethods);

// GET a specific shipping method by id
router.route('/:id').get(controller.getShippingMethodById);

// CREATE a new shipping method
router.route('/').post(controller.createShippingMethod);

// UPDATE a shipping method by id
router.route('/:id').put(controller.updateShippingMethodById);

// DELETE a shipping method by id
router.route('/:id').delete(controller.deleteShippingMethodById);

module.exports = router;
