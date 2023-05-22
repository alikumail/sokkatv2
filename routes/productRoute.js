const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.route("/").get(controller.getAllProducts);

router.route("/:id").get(controller.getProductById);

// router.route("/add").post(controller.createProduct);

// router.route("/:id").delete(controller.deleteProduct);

router.route("/:id").put(controller.updateProduct);


module.exports = router;

module.exports = router;
