const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient = require("../Controllers/patients");
const admin = require("../Controllers/admin");
const auth = require("../middleware/doctor");

router.post("/", doctor.loginDoctor);
router
  .route("/workdays/:id")
  .get(doctor.getWorkingDaysByDoctorId)
  .delete(doctor.deleteWorkingDays);
router.put("/:id",doctor.updateDoctorProfile);
router.post("/workdays", auth.doctorAuth, doctor.addWorkingDays);
router.post("/workhours", auth.doctorAuth, doctor.addWorkingHours);

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
router.get("/all", admin.doctorsList);

module.exports = router;
