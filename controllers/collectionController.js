const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");


// Get all collections
async function getAllCollections(req, res){
  try {
    const collections = await shopify.collection.list();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve collections' });
  }
};

// Get a collection by ID
async function getCollectionById (req, res){
  try {
    const collectionId = req.params.id;
    const collection = await shopify.collection.get(collectionId);
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve collection' });
  }
};

// Create a new collection
async function createCollection (req, res){
  try {
    const collectionData = req.body;
    const newCollection = await shopify.collection.create(collectionData);
    res.json(newCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create collection' });
  }
};

// Update a collection
async function updateCollection(req, res){
  try {
    const collectionId = req.params.id;
    const collectionData = req.body;
    const updatedCollection = await shopify.collection.update(
      collectionId,
      collectionData
    );
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update collection' });
  }
};

// Delete a collection
async function deleteCollection(req, res) {
  try {
    const collectionId = req.params.id;
    await shopify.collection.delete(collectionId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete collection' });
  }
};


module.exports = {
  getAllCollections,
  createCollection,
  getCollectionById,
  deleteCollection,
  updateCollection
  };
