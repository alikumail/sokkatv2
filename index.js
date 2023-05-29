const MongoDB = require("./config/mongo");
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const shopify = require('./services/shopify');

//---------Importing Routes------------//
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');
const addressRoute = require('./routes/addressRoute');
const cartRoute = require('./routes/cartRoute');
const productRoute = require('./routes/productRoute');
const discountRoute = require('./routes/discountRoute');
const collectionRoute = require('./routes/collectionRoute');
const FAQsRoute = require('./routes/FAQsRoute');
const shippingRoute = require('./routes/shippingRoute');

//--------- express app instantiation------------//
const app = express();
const PORT = process.env.PORT || 3000;

//------- Mongodb connection setup ---------//
MongoDB;

//-------- Parsing ----------//
app.use(express.json());
app.use(bodyParser.json());


//------- allow cross-origin requests --------//
app.use(cors({
  origin: true,
  credentials: true
}));


//------- API's --------//
app.use('/api/v1/customer', customerRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/faqs', FAQsRoute);
app.use('/api/v1/shipping', shippingRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/discount', discountRoute);
app.use('/api/v1/collection', collectionRoute);

// app.use((req,res,next)=>{
//   res.status(err.statusCode || 500).json({
//     error: {
//       message: err.message || 'Internal Server Error'
//     },
//   });
// });
// app.use('')

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

