const db = require("../DataBase/models/index");
const User = db.users;
const Doctor = db.doctors;
const WorkingHours = db.workinghours;
const WorkingDays = db.workingdays;
const Appointment = db.appointments;

const MakeAppointment = async (req, res) => {
  const { doctor_id, appointment_date, appointment_time, patient_id } =
    req.body;
  const reserved = await Appointment.findOne({
    where: { appointment_date, appointment_time, doctor_id },
  });

  if (reserved) {
    res.status(400).send("appointment time is already reserved!");
  } else {
    const appointment = await Appointment.create({
      doctor_id,
      appointment_date,
      appointment_time,
      status: "Booked",
      patient_id,
    });
    if (appointment) {
      res
        .status(200)
        .json({ appointment, message: "appointment booked sucessfully!" });
    } else {
      res.status(400).send("Invalid or missing input !");
    }
  }
};

const modifyAppointment = async (req, res) => {
  const {
    appointment_date,
    appointment_time,
    patient_id,
    status,
    appointment_id,
  } = req.body;
  const myAppointment = await Appointment.findOne({
    where: { id: appointment_id, patient_id },
  });
  if (myAppointment) {
    const targetAppointment = await Appointment.findOne({
      where: { appointment_date, appointment_time },
    });
    if (!targetAppointment || targetAppointment.status !== "Booked") {
      myAppointment.appointment_date =
        appointment_date || myAppointment.appointment_date;
      myAppointment.appointment_time =
        appointment_time || myAppointment.appointment_time;
      myAppointment.status = status || myAppointment.status;

      await myAppointment.save();

      res
        .status(200)
        .json({ myAppointment, message: "appointment modified successfully!" });
    } else {
      res.status(400).send("requested appointment is already reserved!");
    }
  } else {
    res.status(400).send("invalid or missing inputs!");
  }
};

const deleteAppointment = async (req, res) => {
  const appointment_id = req.params.id;
  const appointment = await Appointment.findOne({
    where: { id: appointment_id },
  });
  if (!appointment) {
    res.status(400).send("requested appointment is not found!");
  } else {
    await appointment.destroy();
    res.status(200).send("appointment deleted successfully!");
  }
};

module.exports = { MakeAppointment, modifyAppointment, deleteAppointment };
