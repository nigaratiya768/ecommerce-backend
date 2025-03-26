const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "product",
  },

  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  locality: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
