// import shopify from "../shopify.js";
// import axios from "axios";

// const getOrders = async (req, res) => {
//   try {
//     console.log("Getting orders...");
//     const productResponse = await shopify.product.get(6871930208440);
//     console.log({ p: productResponse.variants[0].weight });
//     shopify.order
//       .list({ limit: 1 })
//       .then((orders) => {
//         console.log({ orders });
//         res.send(orders);
//       })
//       .catch((err) => console.error({ err }));

//     // Vuelta larga
//     const order = await shopify.order.get(4482923167928);
//     const productId = order.line_items[0].product_id;
//     console.log({ productId });
//     const product = await shopify.product.get(productId);
//     const inventoryItemId = product.variants[0].inventory_item_id;
//     console.log({ inventoryItemId });
//     const query = { inventory_item_ids: inventoryItemId };
//     const inventoryLevel = await shopify.inventoryLevel.list(query);
//     console.log({ inventoryLevel });
//     const locationId = inventoryLevel[1].location_id;

//     // Vuelta corta\
//     const fulfillment = (
//       await shopify.order.fulfillmentOrders(4462814462136)
//     )[0];
//     console.log({ fulfillment });
//     const locationId = fulfillment.assigned_location_id;

//     const apiUrl = `https://pinflagteststore.myshopify.com/admin/api/2022-04/orders/4462814462136/fulfillments.json`;
//     const body = {
//       fulfillment: {
//         location_id: locationId,
//         tracking_number: null,
//         notify_customer: false
//       }
//     };

//     console.log("Antes de que todo caiga...", { body });
//     const fulfilled = await axios.post(apiUrl, body, {
//       headers: {
//         "X-Shopify-Access-Token": "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"
//       }
//     });

//     console.log({ nice: fulfilled.data });

//     const fulfillments = await shopify.order.fulfillmentOrders(4462857552056);

//     console.log({ fulfillments });

//     const ful2 = await shopify.fulfillmentOrder.get(5434951762104);
//     console.log({ ful2 });

//     order.fulfillment_status = "fulfilled";
//     await order.save({});
//     const reqParams = {
//       message: "The package was fulfilled by Pinflag.",
//       notify_customer: false,
//       tracking_info: {
//         number: 1562678,
//         url: "https://www.example.com",
//         company: "Pinflag"
//       },
//       line_items_by_fulfillment_order: [
//         {
//           fulfillment_order_id: 4462865252536
//         }
//       ]
//     };
//     console.log("Preparing request...");
//     const fulfillmentOrder = await shopify.fulfillment.createV2(reqParams);
//     console.log("Request successful");
//     console.log({ fulfillmentOrder });

//     const order = await shopify.order.update(4487591657656, {
//       tags: ["Pinflags"],
//     });

//     console.log({ order });

//     const newOrder = await shopify.order.get(4462865252536);

//     console.log({ newOrder });
//     const { limit } = req.query;
//     const orders = await shopify.order.list({
//       limit: limit || 4
//     });

//     const filteredOrders = orders.filter(
//       (order) => order.tags.includes("Packed") === false
//     );

//     for (let productOrders of filteredOrders) {
//       productOrders.newProducts = [];
//       for (const product of productOrders.line_items) {
//         console.localStorage(product.variant_id);
//         productOrders.newProducts.push(
//           await shopify.productVariant.get(product.variant_id)
//         );
//       }
//     }

//     res.status(201).json({});
//   } catch (error) {
//     res.status(501).json(error.message);
//   }
// };

// const getPackedOrders = async (req, res) => {
//   const { limit } = req.query;
//   const orders = await shopify.order.list({
//     limit: limit || 2,
//   });

//   const filteredOrders = orders.filter(
//     (order) => order.tags.includes("Packed") === true
//   );
//   res.json(filteredOrders);
// };

// const createPacked = async (req, res) => {
//   const { orderId, user } = req.query;

//   const updatedOrder = await shopify.order
//     .update(orderId, {
//       tags: ["Packed", user],
//     })
//     .then((order) => order)
//     .catch((err) => err);

//   res.json(updatedOrder);
// };

// export { getOrders, createPacked, getPackedOrders };

//------- basic requests --------//
// app.get('/',async(req,res)=>{
//     (async () => {
//       let params = { limit: 10 };
    
//       do {
//         const products = await shopify.product.list(params);
  
//         console.log(products);
    
//         params = products.nextPageParameters;
//       } while (params !== undefined);
      
//     })().catch(console.error);
//   });
