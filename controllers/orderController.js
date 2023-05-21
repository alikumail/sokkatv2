const shopify = require('../services/shopify');
const Customer = require("../models/Customer");
const Order = require("../models/Order");

// Define a function to create a new order
async function createOrder(req, res) {
    try {
      // Get the order data from the request body
      const { line_items, customer, shipping_address, billing_address, total_price } = req.body;
  
      // Create the order on the Shopify store
      const order = await shopify.order.create({
        line_items,
        customer,
        shipping_address,
        billing_address,
        total_price,
      });
  
      // Send the created order back in the response
      res.status(201).json(order);
    } catch (err) {
      // Handle errors and send an error response
      console.error('Failed to create order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }


module.exports = {
    createOrder,
};