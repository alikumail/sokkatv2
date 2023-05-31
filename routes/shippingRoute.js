const express = require('express');
const router = express.Router();

const controller = require('../controllers/shippingController');

// GET all shippingServices
router.route('/').get(controller.listCarrierServices);

// GET a specific shippingService
router.route('/:id').get(controller.getCarrierServices);

// CREATE a new shippingService
router.route('/').post(controller.createCarrierServices);

// UPDATE a shippingService
router.route('/:id').put(controller.updateCarrierService);

// DELETE a shippingService
router.route('/:id').delete(controller.deleteCarrierServices);

module.exports = router;
