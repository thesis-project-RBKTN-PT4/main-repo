const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient = require("../Controllers/patients");
const auth = require("../middleware/doctor");

router.post("/", doctor.loginDoctor);
router.post("/workdays", doctor.addWorkingDays);
router.post("/workhours", doctor.addWorkingHours);
router
  .route("/workdays/:id")
  .get(doctor.getWorkingDaysByDoctorId)
  .delete(doctor.deleteWorkingDays);
router
  .route("/workhours/:id")
  .get(doctor.getWorkingHoursByDoctorId)
  .put(doctor.updateWorkingHours);
router.post("/appointment", auth.doctorAuth, patient.MakeAppointment);
router
  .route("/appointments/:id")
  .get(doctor.allAppointments)
  .delete(patient.deleteAppointment);
router.delete(
  "/appointments",
  auth.doctorAuth,
  doctor.deleteMultipleAppointmlents
);

module.exports = router;
