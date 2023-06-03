const express = require('express');
const Controller = require('../controllers/discountController');

const router = express.Router();

// Get List of PriceRules
router.route('/pricerule').get(Controller.listOfPriceRule);

// get discounts list
router.route('/:id/list').get(Controller.getDiscountList);

// get discounts list
router.route('/:id/pricerule/:ruleId').get(Controller.getDiscount);


module.exports = router;
