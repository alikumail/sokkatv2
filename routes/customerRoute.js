const express = require("express");
const router = express.Router();

// import controllers
const controller = require('../controllers/customerController');
const phone = require('../services/phone.js');

// login
router.route('/login').post(controller.loginCustomer);

// verify phone
// router.route('/verify-phone').post(phone.verify);

// register new customer
router.route('/').post(controller.registerCustomer);

// verify phone number to reset password
// router.route('/verify-phone/reset').post(phone.verify)

// reset password using this api route
router.route('/reset-password').post(controller.resetPassword);

// logout from the device
router.route('/logout').post(controller.logout);

// adding new profile
router.route('/profile').post(controller.registerCustomer);

// updating profile

module.exports = router;
