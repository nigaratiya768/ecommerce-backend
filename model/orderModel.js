const mongoose = require("mongoose");

const product = new mongoose.Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "product",
  },
  quantity: {
    type: Number,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  product_ids: [product],

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  order_value: {
    type: Number,
    default: 0,
  },
  pincode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "order placed",
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
