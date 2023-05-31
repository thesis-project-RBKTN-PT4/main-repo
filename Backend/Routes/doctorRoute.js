const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");

router.post("/", doctor.loginDoctor);
router.post("/workdays", doctor.addWorkingDays);
router.post("/workhours", doctor.addWorkingHours);

module.exports = router;
