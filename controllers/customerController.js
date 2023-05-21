const errorHandler = require("../middleware/errorHandler");

const Customer = require("../models/Customer");
const Profile = require("../models/Profile");
const OTP = require('../models/OTP');
const shopify = require('../services/shopify');

const crypto = require("crypto");
const bcrypt = require("bcrypt");


// Login Api for customer
async function loginCustomer(req, res, next){

  // getting info from body
  const { phone, password, device_id,device_type,language } = req.body;

  try {
    // Find the customer by phone number
    const customer = await Customer.findOne({ phone });

    // If the customer doesn't exist, return an error
    if (!customer) {
      return res.status(404).json({ error: 'customer not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, customer.password);

    // If the passwords match, return a success message
    if (isMatch) {
      customer.device_id = device_id ;
      await customer.save();
      return res.json({ message: 'Login successful' });
    }

    // If the passwords don't match, return an error
    return res.status(401).json({ error: 'Invalid password' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// register new customer
async function registerCustomer(req, res,next) {
    try {
      // Get the customer data from the request body
      const { phone, password, device_id, device_type, language } = req.body;

      // check if data exist
      if(!phone || !password || !device_id || !device_type || !language){
        return next(new errorHandler("Information is Missing","Missing Data Error", 404));
      }

      // HAshing the password
      const code = bcrypt.hashSync(password, 7);

      // check if customer already exist
      const check = await Customer.findOne({ phone });
      if(check){
        res.status(400).json({ error: 'Customer already exist' });
      }

      // Create the order on the Shopify store
      const customer = new Customer({
        phone,
        password: code,
        device_id,
        device_type,
        language,
        status : "PENDING"
      });

      await customer.save();

      res.status(200).json(customer);
      
      // const shopifyCustomer = await shopify.customer.create({
      //   "first_name": "Steve",
      //   "last_name": "Lastnameson",
      //   "email": "steve.lastnameson@example.com",
      //   "phone": "+15142546011",
      //   "verified_email": true,
      //   "password": password,
      //   "password_confirmation": password,
      //   "send_email_welcome": false
      // });

      

    } catch (err) {
      // Handle errors and send an error response
      console.error('Failed to create customer:', err);
      res.status(400).json({ error: 'Failed to create customer' });
    }
  }

  // reset password 
  async function resetPassword(req, res, next){

    const {code, phone, password, device_id, device_type, language } = req.body ;

    try {
      // Find the customer by phone number
      const customer = await Customer.findOne({ phone });
  
      // Find OTP model of the customer
      const otp = await OTP.findOne({ phone });

      // If the customer doesn't exist, return an error
      if (!customer) {
        return res.status(404).json({ error: 'customer not found' });
      }
  
      // Compare the provided verification code with the one stored in the customer object
      if (otp.otp !== code) {
        return res.status(401).json({ error: 'Invalid verification code' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 7);
  
      // Update the customer's password with the new hashed password
      customer.password = hashedPassword;
      otp.otp = null; // Reset the verification code
  
      // Save the updated customer object
      await customer.save();
      await otp.save();
  
      // Return a success message
      res.json({ message: 'Password reset successful' });

    } catch (err) {

      res.status(500).json({ error: err.message });

    }

  }


// logout api
async function logout(req, res, next){

  try {
    const { phone, device_id } = req.body;

    // Find the customer based on the phone number
    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(404).json({ message: 'customer not found' });
    }

    // Check if the device ID matches the logged-in device
    if (customer.device_id !== device_id) {
      return res.status(401).json({ message: 'Invalid device' });
    }

    // Clear the device ID from the customer object to indicate logout
    customer.device_id = null;
    await customer.save();

    return res.json({ message: 'Logout successful' });

  } catch (error) {

    console.error(error);
    res.status(500).send('Server error');

  }

}  

  // add profile information
  async function createProfile(req, res,next) {
    try {
      // Get the customer data from the request body
      const { customer_id, first_name, last_name, address, device_id, device_type, language } = req.body;

      // check if data exist
      if( !customer_id || !first_name || !last_name || !address || !device_id || !device_type || !language){
        return next(new errorHandler("Information is Missing","Missing Data Error", 400));
      }
      // Create the order on the Shopify store
      const profile = new Profile({
        customer_id,
        first_name,
        last_name,
        address
      });

      await profile.save();

      // Send the created order back in the response
      res.status(200).json(profile)

    } catch (err) {
      // Handle errors and send an error response
      console.error('Failed an Error Ocurred:', err);
      res.status(400).json({ error: 'Failed an Error Ocurred' });
    }
  }

  // update profile
  async function updateProfile(req, res, next){
    try {
      const { id } = req.params; // Get the profile ID from the URL
      const { first_name, last_name, address } = req.body; // Get the updated data from the request body
  
      // Find the profile by ID
      const profile = await Profile.findById(id);
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Update the profile fields with the new data
      profile.first_name = first_name || profile.first_name;
      profile.last_name = last_name || profile.last_name;
      profile.address = address || profile.address;
  
      // Save the updated profile
      await profile.save();
  
      return res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

module.exports = {
    registerCustomer,
    loginCustomer,
    resetPassword,
    logout,
    createProfile,
    updateProfile,
};