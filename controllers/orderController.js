const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

//------------------ Get a specific order --------------------- // ok
async function getOrder(req, res){
  try {
    const id = req.params.id;
    const order = await shopify.order.get(id, {fields:"id,line_items,name,total_price"});
    res.status(200).json( order );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve the order.' });
  }
}

//-------------------- Create a new order --------------------- // ok
async function createOrder(req, res){
  try {
    const newOrder = req.body;
    const createdOrder = await shopify.order.create(newOrder);
    res.status(201).json(createdOrder );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create the order.' });
  }
}

//--------------------- Cancel an order --------------------- // ok
async function cancelOrder(req, res){
  try {
    const id = req.params.id;
    const canceledOrder = await shopify.order.cancel(id);
    res.status(200).json({ canceledOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to cancel the order.' });
  }
}

//--------------------- Delete an order ---------------------// ok
 async function deleteOrder(req, res){
  try {
    const id = req.params.id;
    await shopify.order.delete(id);
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete the order.' });
  }
}

//--------------------- Update an order -----------------------// ok
async function updateOrder(req, res){
  try {
    const id = req.params.id;
    const updatedOrder = await shopify.order.update(id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update the order.' });
  }
}

//--------------------- list of orders -----------------------// ok
async function listOrder(req, res){
  try {
    const id = req.params.id;
    const list = await shopify.order.list({
      customer_id: id,
      fields: "created_at,id,name,total-price" // can add fields
    });
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Try Again.' });
  }
}


module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
  deleteOrder,
  updateOrder,
  listOrder
};
