const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "name is missing" });
    }
    if (!mobile) {
      return res.status(400).json({ msg: "mobile is missing" });
    }
    if (!email) {
      return res.status(400).json({ msg: "email is missing" });
    }
    if (!password) {
      return res.status(400).json({ msg: "password is missing" });
    }
    const user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(400).json({ msg: "user already existed" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      mobile,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ msg: "user added successfully", user: newUser });
  } catch (error) {
    console.log("error in userRegister", error);
    return res.status(500).json({ msg: "server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "email is missing" });
    }
    if (!password) {
      return res.status(400).json({ msg: "password is missing" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "wrong password" });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({
        msg: "login successfull",
        token: token,
        role: user.role,
        email: email,
      });
  } catch (error) {
    console.log("error in login", error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = { register, login };
