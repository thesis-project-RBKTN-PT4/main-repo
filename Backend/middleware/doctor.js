const jwt = require("jsonwebtoken");
const db = require("../DataBase/models/index");
const User = db.users;

const doctorAuth = async (req, res, next) => {
  try {
    const doctorToken = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(doctorToken, "doctorSecret");
    const doctor = await User.findByPk(decoded.user_id);
    if (!doctor) {
      throw new Error();
    }
    req.doctor = doctor;
    req.token = doctorToken;
    next();
  } catch (error) {
    // If authentication fails, send error response
    res.status(401).json({ error: "Authorization failed" });
  }
};

module.exports = { doctorAuth };
