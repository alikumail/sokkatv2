const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const Collection = require("../models/Collection");




// Get all products
 async function getAllProducts (req, res) {
    try {
      const products = await shopify.product.list();
      res.json({ products });
    } catch (error) {
      console.error('Failed to get products', error);
      res.status(500).json({ error: 'Failed to get products' });
    }
  };
  
  // Get a product by ID
   async function getProductById (req, res) {
    try {
      const { id } = req.params;
      const product = await shopify.product.get(id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ product });
    } catch (error) {
      console.error('Failed to get product', error);
      res.status(500).json({ error: 'Failed to get product' });
    }
  };
  
  // Create a new product
   async function createProduct (req, res) {
    try {
      const { title, price, description } = req.body;
  
      // Create the new product object
      const newProduct = {
        title,
        body_html: description,
        variants: [{ price }],
      };
  
      const createdProduct = await shopify.product.create(newProduct);
  
      res.json({ product: createdProduct });
    } catch (error) {
      console.error('Failed to create product', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  };
  
  // Update a product by ID
   async function updateProduct (req, res) {
    try {
      const { id } = req.params;
      const { title, price, description } = req.body;
  
      // Update the product
      const updatedProduct = await shopify.product.update(id, {
        title,
        body_html: description,
        variants: [{ price }],
      });
  
      res.json({ product: updatedProduct });
    } catch (error) {
      console.error('Failed to update product', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  
  // Delete a product by ID
   async function deleteProduct (req, res) {
    try {
      const { id } = req.params;
  
      await shopify.product.delete(id);
  
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to delete product', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };


module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  };
