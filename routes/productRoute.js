const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

//-------------------- Get All Products -------------------// ok
router.route("/").get(controller.getAllProducts);

//-------------------- Get Product Information -------------------// ok
router.route("/:id").get(controller.getProductById);

module.exports = router;
