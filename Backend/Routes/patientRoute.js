const express = require("express");
const router = express.Router();
const patient = require("../Controllers/patients");



router.get("/booking/:id",patient.myAppointmentsHistory)
router.post("/booking", patient.MakeAppointment);
router.put("/booking", patient.modifyAppointment);
router.delete("/booking",patient.deleteAppointment)
router.post('/review',patient.addreview)
router.get('/review/:id',patient.getMyReviews)
router.put('/review/:id',patient.updateReview)
router.delete('/review/:id',patient.deleteReview)
module.exports = router;
