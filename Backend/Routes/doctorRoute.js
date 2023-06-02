const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient =require('../Controllers/patients')


router.post("/login", doctor.loginDoctor);
router.put("/update/:id",doctor.updateDoctorProfile)
router.get("/workdays/:id",doctor.getWorkingDaysByDoctorId)
router.post("/workdays", doctor.addWorkingDays);
router.delete("/workdays/:id",doctor.deleteWorkingDays)
router.post("/workhours", doctor.addWorkingHours);
router.get("/workhours/:id", doctor.getWorkingHoursByDoctorId)
router.put("/workhours/:id", doctor.updateWorkingHours)
router.post("/appointment",patient.MakeAppointment)
router.get("/appointments/:id", doctor.allAppointments)
router.delete("/appointment/:id",patient.deleteAppointment)
router.delete("/appointments",doctor.deleteMultipleAppointmlents)

module.exports = router;
