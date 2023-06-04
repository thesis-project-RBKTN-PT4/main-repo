const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");

router.post("/", doctor.loginDoctor);
router.post("/workdays", doctor.addWorkingDays);
router.post("/workhours", doctor.addWorkingHours);
router.get("/workhours/:id", doctor.getWorkingHoursByDoctorId);
router.put("/workhours/:id", doctor.updateWorkingHours);
router.post("/appointment", patient.MakeAppointment);
router.get("/appointments/:id", doctor.allAppointments);
router.delete("/appointment/:id", patient.deleteAppointment);
router.delete("/appointments", doctor.deleteMultipleAppointmlents);

module.exports = router;
