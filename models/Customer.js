// customer.model.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  device_id: {
    type: String,
    required: true
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
