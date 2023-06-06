const express = require("express");
const router = express.Router();

// import controllers
const controller = require('../controllers/customerController');
const phone = require('../services/phone.js');

// login
router.route('/login').post(controller.loginCustomer);

// verify phone
router.route('/verify-phone').post(controller.verifyPhone);

// verify phone number to reset password
// router.route('/verify-phone/reset').post(controller.verify)

// register new customer
router.route('/').post(controller.registerCustomer);

// reset password
router.route('/reset-password').post(controller.resetPassword);

// // get all customers
// router.route('/').get(controller.getAll);

// get customer by id
router.route('/:id').get(controller.getCustomer);

// update customer -------------------------------------- 
router.route('/:id').put(controller.updateCustomer)

// delete customer -------------------------------------- 
router.route('/:id').delete(controller.deleteCustomer)

// adding new profile ------------------------------------ 
router.route('/profile').post(controller.registerCustomer);

// updating profile
router.route('/profile').put(controller.registerCustomer);

// logout from the device
router.route('/logout').post(controller.logout);


module.exports = router;
