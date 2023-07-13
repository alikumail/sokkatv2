const express = require("express");
const router = express.Router();

// import controllers
const controller = require('../controllers/customerController');


// login
router.route('/login').post(controller.loginCustomer);

// verify phone
router.route('/verify-phone').post(controller.verifyPhone);

// resend verify phone
router.route('/resend-code').post(controller.resendVerificationCode);

// verify phone number to reset password
// router.route('/verify-phone/reset').post(controller.verify)

// register new customer
router.route('/register-customer').post(controller.registerCustomer);

// reset password
router.route('/resetpassword').post(controller.resetPassword);

// // get all customers
// router.route('/').get(controller.getAll);

// get customer by id
router.route('/getProfileDetails/:customer_id').get(controller.getProfileDetails);

// update customer -------------------------------------- 
router.route('/update-profile').put(controller.updateProfile)

// delete customer -------------------------------------- 
router.route('/:id').delete(controller.deleteCustomer)

// adding new profile ------------------------------------ 
router.route('/profile').post(controller.registerCustomer);

// updating profile
router.route('/profile').put(controller.registerCustomer);

// logout from the device
router.route('/logout').post(controller.logout);


module.exports = router;
