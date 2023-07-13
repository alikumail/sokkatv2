const MongoDB = require("./config/mongo");
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const shopify = require('./services/shopify');

//---------Importing Routes------------//
const routes = require('./routes');

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
app.use('', routes);

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

