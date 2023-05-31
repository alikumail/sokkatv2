const express = require('express');
const controller = require('../controllers/collectionController');

const router = express.Router();

//------------------------ Create custom collection --------------------------// ok
router.route('/').post(controller.createCollection);

//----------------------- add Product to collection --------------------------// ok
router.route('/:collectionId/product/:productId').post(controller.addItemToCollection);

//----------------------- remove Product from collection ---------------------// ok
router.route('/:collectionId/product/:productId/remove').delete(controller.removeItemFromCollection);

//------------------------- Update custom collection -------------------------// ok
router.route('/:id').put(controller.updateCollection);

//------------------------- Get list of collections --------------------------// ok
router.route('/').get(controller.list);

//-------------------------- Get single collection ---------------------------// ok
router.route('/:id').get(controller.getSingleCollection);

//------------------------ Get single collection Products --------------------// ok
router.route('/:id/products').get(controller.getProducts);

//--------------------- delete collection  -----------------------------------// ok
router.route('/:id').delete(controller.deleteCollection);


module.exports = router;
