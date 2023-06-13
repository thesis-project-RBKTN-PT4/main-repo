import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MakeAppointment = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [dayHours, setDayHours] = useState([]);
  const [hours, setHours] = useState([]);
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [show, setShow] = useState(false);
  const [appointmentDay, setAppointmentDay] = useState("");
  var id;
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem("doctor");
      id = JSON.parse(value).id;
      try {
        const res1 = await axios.get(
          `http://192.168.1.105:3000/doctor/workdays/${id}`
        );
        setDays(res1.data.workdays);

        const res2 = await axios.get(
          `http://192.168.1.105:3000/doctor/workhours/${id}`
        );
        setHours(res2.data.workhours);
        const res3 = await axios.get(
          `http://192.168.1.105:3000/doctor/appointments/${id}`
        );
        setAppointments(res3.data.appointmentList);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
    console.log(hours, days);
  }, []);

  const handleAppointmentSelection = async (h) => {
    const value = await AsyncStorage.getItem("doctor");
    const id = await JSON.parse(value).id;
    axios
      .post("http://192.168.1.105:3000/patient/booking", {
        appointment_date: appointmentDay,
        appointment_time: h,
        doctor_id: id,
        patient_id: 5,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.message);
      });

    setDayHours((prev) => prev.filter((e) => e !== h));
  };
  const weekDays = [
    { day: "Monday", index: 2 },
    { day: "Wednesday", index: 4 },
    { day: "Friday", index: 6 },
    { day: "Sunday", index: 1 },
    { day: "Thursday", index: 5 },
    { day: "Tuesday", index: 3 },
    { day: "Saturday", index: 0 },
  ];
  // const workdays = [
  //   { day: "Monday", hours: ["08:00", "12:00"] },
  //   { day: "Friday", hours: ["08:00", "14:00"] },
  // ]; // this will be fecthed from the server
  const workdays = days.map((day) => {
    return {
      day: day.day_of_week,
      hours: [
        hours.find((h) => h.day_id === day.id)?.start_time,
        hours.find((h) => h.day_id === day.id)?.end_time,
      ],
    };
  });

  const availableDays = [];
  const selectAvdays = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    // Iterate through all the days in the year(t)
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const date = new Date(year, month, day);

        // Check if the current date is a Sunday (index 0)
        for (let i = 0; i < workdays.length; i++) {
          if (
            date.getDay() ===
            weekDays.find((day) => day.day === workdays[i].day).index
          ) {
            const formattedDate = date.toISOString().split("T")[0];
            availableDays.push(formattedDate);
          }
        }
      }
    }

    const markedAvdays = availableDays.reduce((acc, wday) => {
      return { ...acc, [wday]: { selected: true } };
    }, {});

    setMarkedDates(markedAvdays);
  };

  const handleDateSelect = (day) => {
    selectAvdays();
    //availableDays.includes(day.dateString)
    const selectD = moment(new Date(day.dateString)).format("dddd");
    const hours = workdays.find((d) => d.day === selectD).hours;
    const startTime = hours[0];
    const endTime = hours[1];
    setAppointmentDay(day.dateString);
    const format = "HH:mm"; // Time format

    // Parse the time values using the specified format
    const start = moment(startTime, format);
    const end = moment(endTime, format);

    const hoursInBetween = [];
    let current = start.clone();

    // Loop through the hours between start and end time
    while (current.isBefore(end)) {
      hoursInBetween.push(current.format(format));
      current.add(1, "hour");
    }
    const targetDay = appointments.filter(
      (e) => e.appointment_date === day.dateString
    );
    if (targetDay.length > 0) {
      const avHours = hoursInBetween.filter(
        (h) =>
          !targetDay.find(
            (e) => e.appointment_time.split(":").slice(0, -1).join(":") === h
          )
      );
      setDayHours(avHours);
    } else {
      setDayHours(hoursInBetween);
    }
    setShow((prev) => !prev);

    console.log(hoursInBetween);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a day for your next appointment</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          minDate={"2023-01-01"}
          maxDate={"2023-12-31"}
          markedDates={markedDates}
          onVisibleMonthsChange={selectAvdays}
          initiallySelectedDay={new Date()}
        />
      </View>
      {show && (
        <View>
          <Text style={styles.heading}>
            {dayHours.length
              ? "Available hours for an appointment"
              : "Selected day is fully booked"}
          </Text>
          {dayHours.map((h, i) => (
            <TouchableOpacity
              key={i}
              style={styles.timeSlot}
              onPress={() => handleAppointmentSelection(h)}
            >
              <Text style={styles.timeText}>
                {h} - {moment(h, "HH:mm").add(1, "hour").format("HH:mm")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calendarContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeSlot: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
  },
});

export default MakeAppointment;
