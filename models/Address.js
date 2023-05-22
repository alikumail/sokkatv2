const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    require: true,
  },
  shopify_id: {
    type: String,
    require: true,
  }, 
  customer_id: {
    type: String,
    require: true,
  },
  address1: {
    type: String,
    require: true,
  },
  address2: {
    type: String,
    require: false,
  },
  city: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: false,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  province: {
    type: String,
    require: false,
  },
  country: {
    type: String,
    require: true,
  },
  zip: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: false,
  },
  province_code: {
    type: String,
    require: false,
  },
  country_code: {
    type: String,
    require: false,
  },
  country_name: {
    type: String,
    require: false,
  },
});

const address = mongoose.model("Address", addressSchema);

module.exports = address;
