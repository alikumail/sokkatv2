const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  address: {
    line1: {
      type: String,
    },
    line2: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
