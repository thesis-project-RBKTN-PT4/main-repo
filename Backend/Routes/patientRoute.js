const express = require("express");
const router = express.Router();
const patient = require("../Controllers/patients");
const admin = require("../Controllers/admin");

router.get("/booking/:id", patient.myAppointmentsHistory);
router
  .route("/booking")
  .post(patient.MakeAppointment)
  .put(patient.modifyAppointment)
  .delete(patient.deleteAppointment);
router.post("/review", patient.addreview);
router
  .route("/review/:id")
  .get(patient.getMyReviews)
  .put(patient.updateReview)
  .delete(patient.deleteReview);
router.put("/:id",patient.updatePatientProfile);
router.get("/allUsers", admin.allusers);
router.get("/allPatients", admin.patientsList);
module.exports = router;
