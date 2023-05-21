const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

// Define a function to create a new order
async function createOrder(req, res) {
  try {
    // get data from body
    const { customer_id, line_items, transactions, total_tax, currency  } = req.body;

    // get customer from data base
    const customer = await Customer.findById(customer_id);

    // create order on shopify store
    const shopifyOrder = await shopify.order.create({
      line_items ,
      transactions ,
      total_tax ,
      currency 
    });

    // save order details on mongodb
    const order = new Order({
      order_id: shopifyOrder.id,
      shopify_id: customer.shopify_id,
      customer_id: customer.id
    });

    await order.save();

    return res.status(201).json(order);

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: "Failed to create order" });

  }
}


// get order from store
async function getOrders(req, res, next) {
  try {
    let params = { limit: 1 };
    const orders = await shopify.order.list(params);
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to get orders" });
  }
}

module.exports = {
  createOrder,
  getOrders,
};
