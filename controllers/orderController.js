const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

// Define a function to create a new order
async function createOrder(req, res) {
  try {
    // get data from body
    const { customerId, lineItems } = req.body;

    // get customer from data base
    const customer = await Customer.findById(customerId);
    
    // create order on shopify store
    const shopifyOrder = await shopify.order.create({
      customer: "7011102818610",
      line_items: lineItems,
    });

    const order = new Order({
      orderId: shopifyOrder.id,
      shopify_id: customer.shopify_id,
      totalPrice: shopifyOrder.current_subtotal_price,
      lineItems: lineItems,

    });

    await order.save();

    return res.status(201).json(shopifyOrder);

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: "Failed to create order" });
    
  }
}


// get order from store
async function getOrders(req, res, next){
  try{

    let params = { limit: 5 };
    const orders = await shopify.order.list(params);
    res.status(200).json(orders);

  }catch(err){

    console.error(err);
    return res.status(500).json({ error: "Failed to get orders" });

  }
}


module.exports = {
  createOrder,
  getOrders,
};
