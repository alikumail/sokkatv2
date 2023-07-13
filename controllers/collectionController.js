const shopify = require("../services/shopify");


//--------------------- Get all collections -----------------------// ok

async function list(req, res){
  try {
    const collections = await shopify.customCollection.list();
    res.status(200).json(collections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve collections' });
  }
};

//-------------------- Get a single collection by id -------------------// ok

async function getSingleCollection(req, res){
  try {
    const id = req.params.id ;
    const collections = await shopify.collection.get(id);
    res.status(200).json(collections);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to retrieve collection' });
  }
};

//-------------------- Get Products ------------------------------// ok

async function getProducts(req, res){
  try {
    const { collection_id } = req.query;
    // const id = req.params.id ;
    const products = await shopify.collection.products(collection_id);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to retrieve products' });
  }
};

//----------------------- Create a new collection --------------------------// ok

async function createCollection (req, res){
  try {
    const collectionData = req.body;
    const newCollection = await shopify.customCollection.create(collectionData);
    res.status(200).json(newCollection);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(400).json({ error: 'Failed to create collection' });
  }
};

//------------------------- Update a collection --------------------// ok

async function updateCollection(req, res){
  try {
    const id = req.params.id;
    const collectionData = req.body;
    const updatedCollection = await shopify.customCollection.update(
      id,
      collectionData
    );
    res.status(200).json(updatedCollection);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update collection' });
  }
};

//------------------------- Add Item to a collection --------------------// ok

async function addItemToCollection(req, res){
  try {
    const product_id = req.params.productId;
    const collection_id = req.params.collectionId;

    const collect = await shopify.collect.create(
      {
        collection_id,
        product_id
      }
    );
    res.status(200).json(collect);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to add product' });
  }
};

//------------------------- Remove Item from collection --------------------// ok

async function removeItemFromCollection(req, res){
  try {
    const product_id = req.params.productId;
    const collection_id = req.params.collectionId;

    const collect = await shopify.collect.list(
      {
        collection_id,
        product_id
      }
    );
// removing connection
    const id = collect[0].id;

    await shopify.collect.delete(id);

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Connection Error. Try Again' });
  }
};

//----------------------- Delete a collection ----------------------// ok

async function deleteCollection(req, res) {
  try {
    const id = req.params.id;

    await shopify.customCollection.delete(id);
    res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete collection' });
  }
};


module.exports = {

  createCollection,
  getSingleCollection,
  list,
  addItemToCollection,
  removeItemFromCollection,
  getProducts,
  deleteCollection,
  updateCollection

  };
