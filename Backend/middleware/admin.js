const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../DataBase/models/index");
const User = db.users;

const adminAuth = async (req, res, next) => {
  try {
    const adminToken = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(adminToken, "adminSecret");
    const admin = await User.findByPk(decoded);
    if (!admin) {
      throw new Error();
    }
    req.admin = admin;
    req.token = adminToken;
    next();
  } catch (error) {
    // If authentication fails, send error response
    res.status(401).json({ error: "Authorization failed" });
  }
};

module.exports = { adminAuth };
