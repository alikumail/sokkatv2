const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({

  line_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LineItem' }],
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },

  shipping_address: {
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
  },

  billing_address: {
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
  },

  total_price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  
});

// Define the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
