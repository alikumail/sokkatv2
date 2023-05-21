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
    const id = req.params.id ;

    let params = { limit: 1 };

    const orders = await shopify.order.get(id);

    res.status(200).json(orders);

  } catch (err) {

    console.error(err);
    return res.status(500).json({ error: "Failed to get orders" });

  }
}

// cancel order, set status to canceled
async function cancelOrder(req, res, next){
  try {
    const { orderId } = req.params;

    const canceledOrder = await shopify.order.cancel(orderId);

    res.json(canceledOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
}

// delete order 
async function deleteOrder(req, res, next){
  try {
    const { orderId } = req.params;

    await shopify.order.delete(orderId);

    res.sendStatus(204);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Failed to delete order' });

  }
}

// Update an order
async function updatedOrder(req, res, next){
  try {

    const { orderId } = req.params;
    const { orderUpdates } = req.body;

    const updatedOrder = await shopify.order.update(orderId, orderUpdates);

    res.status(200).json(updatedOrder);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Failed to update order' });
    
  }
}

module.exports = {
  createOrder,
  getOrders,
  cancelOrder,
  deleteOrder,
  updateOrder
};
