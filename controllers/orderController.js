const shopify = require("../services/shopify");
const translate = require("../services/translatoinService");

//------------------ Get a specific order --------------------- // ok
async function getOrder(req, res) {
  try {
    const { customer_id } = req.query;
    const order = await shopify.order.get(customer_id, {
      fields: "id,line_items,name,total_price",
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: translate.translate("getOrderFailed", req.body.lang) });
  }
}

//-------------------- Create a new order --------------------- // ok
async function createOrder(req, res) {
  try {
    const bodyParam = req.body;
    const newOrder = {
      tax_lines: bodyParam.tax_lines,
      financial_status: bodyParam.financial_status,
      phone: bodyParam.phone,
      address: bodyParam.address,
      email: bodyParam.email,
      discount_codes: bodyParam.discount_codes,
      line_items: bodyParam.line_items,
      customer: {
        id: bodyParam.customer_id,
      },
      target_selection: "",
      note: "This is apple pay test with dummy amount",
      shipping_lines: bodyParam.shipping_lines,
      total_tax: bodyParam.total_tax,
    };
    const createdOrder = await shopify.order.create(newOrder);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: translate.translate("orderFailed", req.body.lang) });
  }
}

//--------------------- Cancel an order --------------------- // ok
async function cancelOrder(req, res) {
  try {
    const id = req.params.id;
    const canceledOrder = await shopify.order.cancel(id);
    res.status(200).json({ canceledOrder });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: translate.translate("cancelOrderFailed", req.body.lang) });
  }
}

//--------------------- Delete an order ---------------------// ok
async function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    await shopify.order.delete(id);
    res
      .status(200)
      .json({
        message: translate.translate("orderDeletedSuccess", req.body.lang),
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: translate.translate("orderDeletedFailed", req.body.lang),
      });
  }
}

//--------------------- Update an order -----------------------// ok
async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const updatedOrder = await shopify.order.update(id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: translate.translate("orderUpdateFailed", req.body.lang) });
  }
}

//--------------------- list of orders -----------------------// ok
async function listOrder(req, res) {
  try {
    const { customer_id } = req.query;

    const list = await shopify.order.list({
      customer_id,
      fields: "created_at,id,name,total-price", // can add fields
    });
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: translate.translate("networkErrorTryAgain", req.body.lang),
      });
  }
}

// order status pending word
async function getOrderStatus(req, res){
  try{

  }catch(error){

  }
}

module.exports = {
  createOrder,
  getOrder,
  cancelOrder,
  deleteOrder,
  updateOrder,
  listOrder,
  getOrderStatus
};
