const express = require("express");
const router = express.Router();
const users = require("../Controllers/users");

router.get("/", users.allusers);

module.exports = router;
