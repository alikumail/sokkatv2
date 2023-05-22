const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");


// Create a discount code
async function createDiscount (req, res) {
    try {
      const { code, discountAmount } = req.body;
  
      // Create the discount code
      const discount = await shopify.discount.create({
        code,
        discountAmount,
      });
  
      res.json({ discount });
    } catch (error) {
      console.error('Failed to create discount', error);
      res.status(500).json({ error: 'Failed to create discount' });
    }
  };
 
  // Get a discount code by code
  async function getDiscountByCode (req, res) {
    try {
      const { code } = req.params;
  
      // Get the discount code by code
      const discount = await shopify.discount.get(code);
  
      res.json({ discount });
    } catch (error) {
      console.error('Failed to get discount', error);
      res.status(500).json({ error: 'Failed to get discount' });
    }
  };
  
  // Delete a discount code by code
  async function deleteDiscountByCode (req, res) {
    try {
      const { code } = req.params;
  
      // Delete the discount code by code
      await shopify.discount.delete(code);
  
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to delete discount', error);
      res.status(500).json({ error: 'Failed to delete discount' });
    }
  };


module.exports = {
  createDiscount,
  getDiscountByCode,
  deleteDiscountByCode,
  };
