
const shopify = require('../services/shopify')
const Shipping = require('../models/Shipping');


// Create a Carrier Service
async function createCarrierServices(req, res){
  try {
    const newCarrierService = req.body;
    const createdCarrierService = await shopify.carrierService.create(newCarrierService);
    res.status(201).json(createdCarrierService );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create the Carrier Service.' });
  }
}

// Delete a Carrier Service
async function deleteCarrierServices(req, res){
  try {
    const { id } = req.params;
    await shopify.carrierService.delete(id);
    res.status(200).json({ message: 'Carrier Service deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete the Carrier Service.' });
  }
}

// Get a specific Carrier Service
async function getCarrierServices(req, res){
  try {
    const { id } = req.params;
    const { delivery_country } = req.body;
    const carrierService = await shopify.carrierService.get(id);
    res.status(200).json( carrierService );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve the Carrier Service.' });
  }
}

// Get a list of Carrier Services
async function listCarrierServices(req, res){
  try {
    const carrierServices = await shopify.carrierService.list();
    res.status(200).json(carrierServices );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve the Carrier Services.' });
  }
}

// Update a Carrier Service
async function updateCarrierService(req, res) {
  try {
    const { id } = req.params;
    const updatedCarrierService = await shopify.carrierService.update(id, req.body);
    res.status(200).json(updatedCarrierService );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update the Carrier Service.' });
  }
}

module.exports = {
  createCarrierServices,
  updateCarrierService,
  listCarrierServices,
  getCarrierServices,
  deleteCarrierServices
}