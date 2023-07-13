const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

//-------------------- Get All Products -------------------// ok
router.route("/getProducts").get(controller.getAllProducts);

//-------------------- Get Product Information -------------------// ok
router.route("/getProductDetails").get(controller.getProductDetails);

module.exports = router;
