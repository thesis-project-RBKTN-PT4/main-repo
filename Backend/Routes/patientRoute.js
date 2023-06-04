const express = require("express");
const router = express.Router();
const patient = require("../Controllers/patients");

router.post("/booking", patient.MakeAppointment);
router.put("/booking", patient.modifyAppointment);
router.delete("/booking/:id", patient.deleteAppointment);

module.exports = router;
