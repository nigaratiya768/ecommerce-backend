const mongoose = require("mongoose");

const material_and_care_schema = new mongoose.Schema({
  key: String,
  value: String,
});

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product_detail: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  material_and_care: [material_and_care_schema],
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = { Product };
