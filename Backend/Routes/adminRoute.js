const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("admin is not created yet");
});

module.exports = router;
