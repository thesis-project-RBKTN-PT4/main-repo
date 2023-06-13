const express = require("express");
const router = express.Router();
const users = require("../Controllers/users");

router.route("/:id").get(users.oneuser).delete(users.deleteUser);
router.post("/", users.createUser);


module.exports = router;
