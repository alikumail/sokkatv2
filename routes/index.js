const customerRoute = require('./customerRoute');
const orderRoute = require('./orderRoute');
const addressRoute = require('./addressRoute');
const cartRoute = require('./cartRoute');
const productRoute = require('./productRoute');
const discountRoute = require('./discountRoute');
const collectionRoute = require('./collectionRoute');
const FAQsRoute = require('./FAQsRoute');
const shippingRoute = require('./shippingRoute');
const notificationRoute = require('./notificationRoute');

const express = require('express');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/api',
        route: customerRoute,
      },
      {
        path: '/api',
        route: orderRoute,
      },
      {
        path: '/api',
        route: addressRoute,
      },
      {
        path: '/api',
        route: cartRoute,
      },
      {
        path: '/api',
        route: productRoute,
      },
      {
        path: '/api',
        route: discountRoute,
      },
      {
        path: '/api',
        route: collectionRoute,
      },
      {
        path: '/api',
        route: FAQsRoute,
      },
      {
        path: '/api',
        route: shippingRoute,
      },
      {
        path: '/api',
        route: notificationRoute,
      },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
