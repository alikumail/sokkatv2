// customer.model.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  shopify_id: {
    type: Number,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  country: String,
  city: String,
  device_id: {
    type: String
  },
  device_type: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  },

}, 
{
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
