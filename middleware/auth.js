const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

const Access = {
  user: ["add_order", "get_order", "get_orders"],
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "unautorized" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload", payload);
    const user = await User.findOne({ email: payload.email });
    // console.log("user", user);
    req.user = user;
    if (user.role == "user") {
      const userAccess = Access.user.filter((v) => {
        return req.path.includes(v);
      });
      if (userAccess.length < 1) {
        return res.status(401).json({ msg: "you are unauthorized" });
      } else {
        next();
        return;
      }
    }
    if (user.role == "admin") next();
  } catch (error) {
    console.log("error in authentication", error);
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = { auth };
