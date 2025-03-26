const { Order } = require("../model/orderModel");

const addOrder = async (req, res) => {
  try {
    const {
      product_id,
      name,
      email,
      mobile,
      pincode,
      address,
      locality,
      city,
      state,
    } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "name is missing" });
    }
    if (!email) {
      return res.status(400).json({ msg: "email id is missing" });
    }
    if (!mobile) {
      return res.status(400).json({ msg: "mobile number is missing" });
    }
    if (mobile.length < 10 || mobile.length > 10) {
      return req.status(400).json({ msg: "please enter valid mobile number" });
    }
    if (!pincode) {
      return res.status(400).json({ msg: "pincode is missing" });
    }
    if (!address) {
      return res.status(400).json({ msg: "address is missing" });
    }
    if (!locality) {
      return res.status(400).json({ msg: "locality is missing" });
    }
    if (!city) {
      return res.status(400).json({ msg: "city is missing" });
    }
    if (!state) {
      return res.status(400).json({ msg: "state is missing" });
    }
    const order = new Order({
      product_id,
      name,
      email,
      mobile,
      pincode,
      address,
      locality,
      city,
      state,
    });
    await order.save();
    return res
      .status(200)
      .json({ msg: "order added successfully", order: order });
  } catch (error) {
    console.log("error in addOrder", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ msg: "id is missing" });
    }
    const order = await Order.findById({ _id: id });
    if (!order) {
      return res.status(400).json({ msg: "order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log("error in getOrder", error);
    return res.status(500).json({ msg: "server error" });
  }
};
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product_id");
    if (!orders) {
      return res.status(400).json({ msg: "orders not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.log("error in getOrders", error);
    return res.status(500).json({ msg: "server error" });
  }
};
module.exports = { addOrder, getOrder, getOrders };
