const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address_id: {
    type: Number,
    required: true,
    unique: true,
  },
  shopify_id: {
    type: Number,
    required: true,
  }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
