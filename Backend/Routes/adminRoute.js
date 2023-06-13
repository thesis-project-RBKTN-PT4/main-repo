const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient = require("../Controllers/patients");
const user = require("../Controllers/users");
const admin = require("../Controllers/admin");
const auth = require("../middleware/admin");

router.post("/login", admin.loginAdmin);
router.get("/users", auth.adminAuth, admin.allusers);
router.get("/doctors", auth.adminAuth, admin.doctorsList);
router.get("/doctorsList", admin.doctorsList);

router.get("/patients", auth.adminAuth, admin.patientsList);
router.delete("/user/:id", auth.adminAuth, user.deleteUser);
router
  .route("/reviews")
  .all(auth.adminAuth)
  .get(admin.allReviews)
  .delete(patient.deleteReview);
router.get("/appointments", auth.adminAuth, admin.allAppointments);
module.exports = router;
