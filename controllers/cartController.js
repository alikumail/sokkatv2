const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");

// create new Cart
async function addCart(req, res){
    try {
        const cartData = req.body; // Assuming the request body contains the cart data
    
        // Create the cart using the Shopify API
        const cart = await shopify.cart.create(cartData);
    
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create cart' });
      }
}

// get cart by id
async function getCart(req, res){
    try {
        const cartId = req.params.id;
    
        // Get the cart using the Shopify API
        const cart = await shopify.cart.get(cartId);
    
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cart' });
      }
}

// update a cart
async function updateCart(req, res){
    try {
        const cartId = req.params.id;
        const cartData = req.body; // Assuming the request body contains the updated cart data
    
        // Update the cart using the Shopify API
        const cart = await shopify.cart.update(cartId, cartData);
    
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
      }
}


// delete a cart
async function deleteCart(req, res){
    try {
        const cartId = req.params.id;
    
        // Delete the cart using the Shopify API
        await shopify.cart.delete(cartId);
    
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete cart' });
      }
}


module.exports = {
  addCart,
  getCart,
  deleteCart,
  updateCart,
//   removeCartItem,
  };
