const { Order } = require("../model/orderModel");
const { Product } = require("../model/productModel");
const { sendEmail } = require("../services/mailService");

const addOrder = async (req, res) => {
  try {
    const {
      product_ids,
      quantity,
      name,
      email,
      mobile,
      pincode,
      address,
      locality,
      city,
      state,
      order_value,
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
      product_ids,
      quantity,
      name,
      email,
      mobile,
      pincode,
      address,
      locality,
      city,
      state,
      order_value,
    });
    await order.save();
    // await Product.updateOne(
    //   { _id: product_ids },
    //   {
    //     quantity: {
    //       $inc: -quantity,
    //     },
    //   }
    // );
    // const products = await Product.find({
    //   _id: {
    //     $in: product_ids.map((v) => {
    //       return v.product_id;
    //     }),
    //   },
    // });

    const orders = await Order.findOne({ _id: order._id }).populate(
      "product_ids.product_id"
    );

    sendEmail(order, orders, "nigaratiya786@gmail.com");
    sendEmail(order, orders, req.body.email);
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
    const role = req.user.role;
    const email = req.user.email;
    let orders = null;
    if (role == "user") {
      orders = await Order.find({ email: email }).populate(
        "product_ids.product_id"
      );
    }
    if (role == "admin") {
      orders = await Order.find().populate("product_ids.product_id");
    }

    if (!orders) {
      return res.status(400).json({ msg: "orders not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.log("error in getOrders", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ msg: "id not found" });
    }
    let order = await Order.findOneAndUpdate(
      { _id: id },
      { status: req.body.status }
    ).populate("product_ids.product_id");

    sendEmail(order, order, order.email);
    return res.status(200).json(order);
  } catch (error) {
    console.log("error in orderUpdate", error);
    return res.status(500).json({ msg: "server error" });
  }
};

// const placeOrders = async () => {
//   try {
//     const orderArray = [];
//   } catch (error) {
//     console.log("error in placeOrder");
//     return res.status(500).json({ msg: "server error" });
//   }
// };

const stats = async (req, res) => {
  try {
    const orders = await Order.find();
    let totalOrder = orders.length;
    let totalSales = 0;
    let totalDeliveredOrders = 0;
    let totalCustomers = 0;

    let uniqueCustomer = new Set();
    for (let i = 0; i < orders.length; i++) {
      totalSales = totalSales + orders[i].order_value;
      if (orders[i].status == "delivered") {
        totalDeliveredOrders = totalDeliveredOrders + 1;
      }
      console.log("xyz", orders[i].email);
      uniqueCustomer.add(orders[i].email);
    }
    console.log("abc", totalSales, totalCustomers, Array.of(uniqueCustomer));
    totalCustomers = Array.from(uniqueCustomer).length;
    return res
      .status(200)
      .json({ totalOrder, totalSales, totalCustomers, totalDeliveredOrders });
  } catch (error) {
    console.log("error in stats", error);
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = { addOrder, getOrder, getOrders, updateOrder, stats };
