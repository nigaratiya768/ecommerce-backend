const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { connectWithDB } = require("./database_connection/connectDB");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./controller/productController");
const { upload } = require("./middleware/image_upload");
connectWithDB();
const cors = require("cors");
const { register, login } = require("./controller/userController");
const {
  addOrder,
  getOrder,
  getOrders,
} = require("./controller/orderController");
app.use(cors());

const { sendEmail } = require("./services/mailService");
sendEmail();

app.use(express.json());

app.use(express.static("images"));
const PORT = 4001;

app.post("/api/user_register", register);
app.post("/api/user_login", login);

app.post("/api/add_product", upload.single("image"), addProduct);
app.get("/api/get_products", getProducts);
app.get("/api/get_product/:id", getProduct);
app.put("/api/update_product/:id", updateProduct);
app.delete("/api/delete_product/:id", deleteProduct);

app.post("/api/add_order", addOrder);
app.get("/api/get_order/:id", getOrder);
app.get("/api/get_orders", getOrders);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
