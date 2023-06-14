
const Customer = require("../models/Customer");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const shopify = require("../services/shopify");
const phoneValidator = require('../utils/phone');
const unifonic = require("../services/unifonic")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const translate = require('../services/translatoinService');

//-----------------------Verify customer phone---------------------------//

async function verifyPhone(req, res, next) {
  try {
    const { phone } = req.body;
    if(!phone){
      res.status(404).json(translate("missingData",req.body.lang));
    }
    // phone number validation
    if(!phoneValidator.validatePhoneNumber(phone)){
      res.status(422).json({error: translate("provideValidPhone",req.body.lang)});
    }
    const optres = await unifonic.sendOTP(phone);

    if(optres.success)
    {
      return res.status(200).json({ message: translate("optSuccess",req.body.lang)});
    } else {
      return res.status(422).json({ message: translate("optFailed",req.body.lang) });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//----------------------- Login Api for customer ---------------------------//

async function loginCustomer(req, res, next) {
  try {
    const { phone, password, device_id, device_type, language } = req.body;
    if(!phone || !password || !device_id || !device_type){
      res.status(404).json(translate("missingData",req.body.lang));
    }
    // phone number validation
    if(!phoneValidator.validatePhoneNumber(phone)){
      res.status(422).json({error:translate("provideValidPhone",req.body.lang)});
    }

    // Find the customer by phone number
    const customer = await Customer.findOne({ phone });
    // If the customer doesn't exist, return an error
    if (!customer) {
      return res.status(404).json({ error:translate("missingCustomer",req.body.lang) });
    }

    const isMatch = await bcrypt.compare(password, customer.password); // Compare the provided password

    // If the passwords match, return a success message
    if (isMatch) {
      customer.device_id = device_id;
      customer.device_type = device_type;
      await customer.save();
      return res.status(200).json({ message: translate("loginSuccess",req.body.lang)  });
    }

    // If the passwords don't match, return an error
    return res.status(401).json({ error: translate("invalidPassword",req.body.lang)   });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//---------------------------- register new customer ---------------------------// ok

async function registerCustomer(req, res, next) {
  try {
    // Get the customer data from the request body
    const { firstName,lastName,email,phone,country,city,password,device_id,device_type,language, } = req.body;

    // check if data exist
    if (
      !firstName || !lastName || !email || !phone || !password || !device_id || !device_type || !language ||
      !phoneValidator.validatePhoneNumber(phone)
    ) {
      return next(
        res.status(402).json(translate("missingData",req.body.lang)  , 404)
      );

    }
    // creating customer in shopify store
    const shopifyCustomer = await shopify.customer.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    });

    // HAshing the password
    const code = bcrypt.hashSync(password, 7);
    // check if customer already exist
    const check = await Customer.findOne({ phone });
    if (check) {
      res.status(400).json({ error: translate("customerExist",req.body.lang)   });
    }

    // Create the order on the Shopify store
    const customer = new Customer({
      shopify_id: shopifyCustomer.id,
      phone,
      password: code,
      country,
      city,
      device_id,
      device_type,
      language,
      status: "PENDING",
    });

    await customer.save();
    res.status(200).json(customer);
  } catch (err) {
    // Handle errors and send an error response
    console.error(err);
    res.status(400).json({ error: translate("customerCreationFailed",req.body.lang) });
  }
}

//---------------------------- update customer ------------------------------------ // ok

async function updateCustomer(req, res, next){

  try {
    const customerId = req.params.id;
    const updateData = req.body.params;

    if(!phoneValidator(updateData.phone)){
      res.status(422).json({ error: translate("provideValidPhone",req.body.lang) });
    }
    const updatedCustomer = await shopify.customer.update(customerId, updateData);
    res.status(200).json(updatedCustomer);

  } catch (error) {

    console.error(error);
    res.status(400).json({ error: translate("customerUpdateFailed",req.body.lang) });

  }
}

//-------------------------- reset password --------------------------------// 

async function resetPassword(req, res, next) {
  const { code, phone, password, device_id, device_type, language } = req.body;

  try {
    if(!phoneValidator(phone)){
      res.status(422).json({ error: 'Provide Valid phone "+xxxxxxxxxxx" ' });
    }
    // Find the customer by phone number
    const customer = await Customer.findOne({ phone });
    // If the customer doesn't exist, return an error
    if (!customer) {
      return res.status(404).json({ error: "Database Error" });
    }
    // Find OTP model of the customer
    const otp = await OTP.findOne({ phone });

    // Compare the provided verification code with the one stored in the customer object
    if (otp.otp !== code) {
      return res.status(401).json({ error: "Invalid verification code" });
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
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//--------------------- add profile information -----------------------// discussion about address, customer id is it shopify or not

async function createProfile(req, res, next) {
  try {
    // Get the customer data from the request body
    const { customer_id, first_name, last_name, address, device_id, device_type, language } = req.body;

    // check if data exist
    if (
      !customer_id ||
      !first_name ||
      !last_name ||
      !address 
    ) {
        res.status(404).json("Information is Missing Missing Data Error", 400);
    }
    // Create the order on db
    const profile = new Profile({
      customer_id,
      first_name,
      last_name,
      address,
    });

    await profile.save();

    // Send the created order back in the response
    res.status(200).json(profile);

  } catch (err) {
    // Handle errors and send an error response
    console.error("Failed an Error Ocurred:", err);
    res.status(400).json({ error: "Failed an Error Ocurred" });
  }
}

//------------------------- update profile -------------------------//

async function updateProfile(req, res, next) {
  try {
    const { id } = req.params; // Get the profile ID from the URL
    const params = req.body; // Get the updated data from the request body

    // Find the profile by ID
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
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
    res.status(500).send("Server error");
  }
}


//----------------------------- logout api -------------------------------// 
async function logout(req, res, next) {
  try {
    const { phone, device_id } = req.body;

    // Find the customer based on the phone number
    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }

    // Check if the device ID matches the logged-in device
    if (customer.device_id !== device_id) {
      return res.status(401).json({ message: "Invalid device" });
    }

    // Clear the device ID from the customer object to indicate logout
    customer.device_id = null;
    await customer.save();

    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

//---------------------------- get all customers -------------------------//

async function getAll(req, res){
  const customers =await shopify.customer.list();
  res.json(customers);
}

//---------------------------- get customers by id -------------------------//

async function getCustomer(req, res){
  try{

    const id = req.params.id;
    const customer =await shopify.customer.get(id);
    res.status(200).json(customer);
  }catch(error){

    console.log(error);
    res.status(404).json("Customer not found")
  }
}


//-------------------------- delete customer --------------------------//

async function deleteCustomer(req, res){
  try{

    const id = req.params.id;
    await shopify.customer.delete(id);
    res.json.status(200).json('Customer Deleted Successfully');
  }catch(error){

    console.log(error);
    res.status(404).json("Customer not found")
  }
  
}

//--------------------------- Exporting Functions ------------------------//

module.exports = {
  registerCustomer,
  updateCustomer,
  deleteCustomer,
  getAll,
  getCustomer,
  loginCustomer,
  resetPassword,
  logout,
  createProfile,
  updateProfile,
  verifyPhone,
};
