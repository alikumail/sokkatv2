const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
