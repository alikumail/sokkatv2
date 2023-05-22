const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Shipping', shippingSchema);
