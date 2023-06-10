const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient = require("../Controllers/patients");
const auth = require("../middleware/doctor");

router.post("/", doctor.loginDoctor);
router.post("/workdays", auth.doctorAuth, doctor.addWorkingDays);
router.post("/workhours", auth.doctorAuth, doctor.addWorkingHours);
router
  .route("/workhours/:id")
  .all(auth.doctorAuth)
  .get(doctor.getWorkingHoursByDoctorId)
  .put(doctor.updateWorkingHours);
router.post("/appointment", auth.doctorAuth, patient.MakeAppointment);
router
  .route("/appointments/:id")
  .all(auth.doctorAuth)
  .get(doctor.allAppointments)
  .delete(patient.deleteAppointment);
router.delete(
  "/appointments",
  auth.doctorAuth,
  doctor.deleteMultipleAppointmlents
);

module.exports = router;
