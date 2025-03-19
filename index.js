const express = require("express");
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
app.use(express.json());
const PORT = 4001;

app.post("/api/add_product", upload.single("image"), addProduct);
app.get("/api/get_products", getProducts);
app.get("/api/get_product/:id", getProduct);
app.put("/api/update_product/:id", updateProduct);
app.delete("/api/delete_product/:id", deleteProduct);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
