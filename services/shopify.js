const Shopify = require('shopify-api-node');
require('dotenv').config();


const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.API_KEY,
  password: process.env.ADMIN_API_TOKEN,
  apiVersion: '2023-04',
});

module.exports = shopify;
