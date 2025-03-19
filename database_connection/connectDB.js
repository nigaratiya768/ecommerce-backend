const mongoose = require("mongoose");

const connectWithDB = () => {
  try {
    const connect = mongoose.connect("mongodb://localhost:27017/productDB");
    console.log("database successfully connected");
  } catch (error) {
    console.log("error in connectWithDB");
  }
};
module.exports = { connectWithDB };
