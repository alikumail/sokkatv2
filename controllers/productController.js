const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");

//------------------------ Get all products ----------------------// ok

async function getAllProducts(req, res) {
  try {

    const products = await shopify.product.list({fields: "id,title,variants,images"});
    res.status(200).json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get products" });
  }
}

// Get a product by ID
async function getProductDetails(req, res) {
  try {
    const id = req.body.formdata.find(item => item.key === 'product_id')?.value;
    const lang = req.body.formdata.find(item => item.key === 'lang')?.value;

    const product = await shopify.product.get(id,{fields: "id,title,variants,images"});

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Failed to get product", error);
    res.status(500).json({ error: "Failed to get product" });
  }
}


module.exports = {

  getAllProducts,
  getProductDetails,

};
