import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import axios from "axios";

const MyCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [dayHours, setDayHours] = useState([]);
  const [show, setShow] = useState(false);
  const [appointmentDay, setAppointmentDay] = useState("");

  const handleAppointmentSelection = (h) => {
    axios
      .post("http://192.168.1.105:3000/patient/booking", {
        appointment_date: appointmentDay,
        appointment_time: h,
        doctor_id: 5,
        patient_id: 5,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.message);
      });
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
  const workdays = [
    { day: "Monday", hours: ["08:00", "12:00"] },
    { day: "Friday", hours: ["08:00", "14:00"] },
  ]; // this will be fecthed from the server

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

    // Mark the Sundays in the markedDates object
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
    setDayHours(hoursInBetween);
    setShow((prev) => !prev);

    console.log(hoursInBetween);
  };

  return (
    <View style={{ marginTop: 40 }}>
      <Text style={{ marginLeft: 20 }}>
        Pick a day for you next appointment
      </Text>
      <View style={{ marginTop: 30 }}>
        <Calendar
          onDayPress={handleDateSelect}
          minDate={"2023-01-01"}
          maxDate={"2023-12-31"}
          markedDates={markedDates}
          onVisibleMonthsChange={selectAvdays}
          initiallySelectedDay={new Date()}
        />
      </View>
      {show ? (
        <View>
          <Text style={styles.heading}>Available hours for an appointment</Text>
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
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
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

export default MyCalendar;
