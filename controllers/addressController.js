const shopify = require("../services/shopify");


// create new address ----------------------------//ok
async function createAddress(req, res) {

  try {

    const customerId = req.body.customer_id;
    const addressParams = req.body.params;

    // Create the address using the Shopify API
    const address = await shopify.customerAddress.create(customerId,addressParams);

    res.status(200).json(address);

  } catch (error) {

    console.log(error);
  
    res.status(500).json({ error: "Failed to create address" });
    
  }
}

// get address by id ----------------------------//ok
async function getAddress(req, res) {

  try {

    const id = req.params.id;

    const customerId = req.body.customer_id;

    // Get the address using the Shopify API
    const address = await shopify.customerAddress.get(customerId,id);

    res.status(200).json(address);

  } catch (error) {

    res.status(500).json({ error: "Process Failed" });
    
  }
}

// get all addresses --------------------------------//ok
async function getAllAddress(req, res) {

  try {
    const customerId = req.params.id;

    // Get the address using the Shopify API
    const address = await shopify.customerAddress.list(customerId);

    res.json(address);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve addresses" });
    
  }
}

// setting default address ----------------------// ok
async function defaultAddress(req, res) {
  try {
    const customerId = req.params.id;

    const id = req.body.address_id;

    // Cancel the address using the Shopify API
    const address = await shopify.customerAddress.default( customerId, id );

    res.json(address);

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: "Failed to set default address" });

  }
}

// deleting address -------------------------------// ok
async function deleteAddress(req, res) {
  try {

    const customerId = req.body.customer_id;
    const id = req.params.id;

    // Delete the address using the Shopify API
    await shopify.customerAddress.delete(customerId, id);

    res.status(200).json({ success: true });

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: "Failed to delete address" });

  }
}

// updating address -------------------------------- // ok
async function updateAddress(req, res) {
  try {

    const id = req.params.id;
    const customerId = req.body.customer_id; 
    const addressData = req.body.params;

    // Update the address using the Shopify API
    const address = await shopify.customerAddress.update(
      customerId,
      id,
      addressData
    );

    res.status(200).json(address);

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: "Failed to update address" });

  }
}

module.exports = {

  createAddress,
  getAddress,
  getAllAddress,
  defaultAddress,
  deleteAddress,
  updateAddress,

};
