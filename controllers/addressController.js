const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Address = require("../models/Address");

// create new address
async function createAddress(req, res){
  try {
    const addressData = req.body; // Assuming the request body contains the address data

    // Create the address using the Shopify API
    const address = await shopify.customerAddress.create(addressData);

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create address' });
  }
}

// get address by id
async function getAddress(req, res){
  try {
    const addressId = req.params.id;

    // Get the address using the Shopify API
    const address = await shopify.customerAddress.get(addressId);

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve address' });
  }
}

async function defaultAddress(req, res){
  try {
    const addressId = req.params.id;

    // Cancel the address using the Shopify API
    const address = await shopify.customerAddress.defaultAddress(addressId);

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel address' });
  }
}

async function deleteAddress(req, res){
  try {
    const addressId = req.params.id;

    // Delete the address using the Shopify API
    await shopify.customerAddress.delete(addressId);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address' });
  }
}

async function updateAddress(req, res){
  try {
    const addressId = req.params.id;
    const addressData = req.body; // Assuming the request body contains the updated address data

    // Update the address using the Shopify API
    const address = await shopify.customerAddress.update(addressId, addressData);

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address' });
  }
}


module.exports = {
  createAddress,
  getAddress,
  defaultAddress,
  deleteAddress,
  updateAddress
  };
