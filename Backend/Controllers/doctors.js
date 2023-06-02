const bcrypt = require("bcrypt");
const db = require("../DataBase/models/index");
const User = db.users;
const Doctor = db.doctors;
const WorkingHours = db.workinghours;
const WorkingDays = db.workingdays;
const jwt = require("jsonwebtoken");

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const doctor = await Doctor.findOne({ where: { user_id: user.id } });
      const token = jwt.sign({ user_id: user.id }, "secret");
      res
        .status(200)
        .json({ doctor, message: "Doctor logged in successfully!", token });
    }
  }
};

const addWorkingDays = async (req, res) => {
  const { day, doctor_id } = req.body;
  const duplicate = await WorkingDays.findOne({
    where: { day_of_week: day, doctor_id: doctor_id },
  });
  if (duplicate) {
    res.status(400).send("day already exist!");
  } else {
    const workingday = await WorkingDays.create({
      day_of_week: day,
      doctor_id: doctor_id,
    });
    if (workingday) {
      res.status(200).json({ workingday, message: "workingdays added!" });
    } else {
      res.status(400).send("missing inputs");
    }
  }
};

const addWorkingHours = async (req, res) => {
  const { end_time, start_time, day_id, doctor_id } = req.body;

  const duplicate = await WorkingHours.findOne({
    where: {
      day_id: day_id,
      doctor_id: doctor_id,
      end_time: end_time,
      start_time: start_time,
    },
  });
  if (duplicate) {
    res.status(400).send("hours already exist!");
  } else {
    const workinghours = await WorkingHours.create({
      day_id: day_id,
      doctor_id: doctor_id,
      end_time: end_time,
      start_time: start_time,
    });

    if (workinghours) {
      res
        .status(200)
        .json({ workinghours, message: "working hours added successfully!" });
    } else {
      res.status(400).send("Invalid or missing inputs!");
    }
  }
};

module.exports = { loginDoctor, addWorkingDays, addWorkingHours };
