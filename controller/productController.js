const { Product } = require("../model/productModel");

const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      price,
      size,

      color,
      product_detail,
      material_and_care,
    } = req.body;
    // console.log(req.file);
    const image = req.file.filename;
    console.log(req.body);
    if (!product_name) {
      return res.status(400).json({ msg: "product name is missing!" });
    }
    if (!price) {
      return res.status(400).json({ msg: "price is missing!" });
    }
    if (!size) {
      return res.status(400).json({ msg: "size is missing!" });
    }
    if (!image) {
      return res.status(400).json({ msg: "image is missing!" });
    }
    if (!color) {
      return res.status(400).json({ msg: "color is missing!" });
    }
    if (!product_detail) {
      return res.status(400).json({ msg: "product detail is missing!" });
    }
    if (!material_and_care) {
      return res.status(400).json({ msg: "material and care is missing!" });
    }
    const product = new Product({
      product_name,
      price,
      size: JSON.parse(size),
      image,
      color,
      product_detail,
      material_and_care: JSON.parse(material_and_care),
    });

    await product.save();
    console.log("data saved");
    return res
      .status(200)
      .json({ msg: "product saved successfully", product: product });
  } catch (error) {
    console.log("error in addProduct", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.log("error in getProduct", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log("error in getProduct", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      product_name,
      price,
      size,
      color,
      product_detail,
      material_and_care,
    } = req.body;

    const product = await Product.updateOne(
      { _id: id },
      {
        product_name: product_name,
        price: price,
        size: size,
        color: color,
        product_detail: product_detail,
        material_and_care: material_and_care,
      }
    );
    return res.status(200).json({ msg: "updated successefully" });
  } catch (error) {
    console.log("error in updateProduct", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    return res.status(200).json({ msg: "successfully deleted" });
  } catch (error) {
    console.log("error in deleteProduct", error);
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
