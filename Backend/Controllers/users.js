const db = require("../DataBase/models/index");
const User = db.users;

const allusers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

module.exports = { allusers };
