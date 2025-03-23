const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header.authorization;
    if (!token) {
      return res.status(400).json({ msg: "unautorized" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log("error in authentication", error);
    return res.status(500).json({ msg: "server error" });
  }
};

module.export = { auth };
