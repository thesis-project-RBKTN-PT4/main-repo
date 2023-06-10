import { React, useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";
import DoctorSchedule from "./DoctorSchedule";

const CurrentSchedule = () => {
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.105:3000/doctor/workdays/5`)
      .then((res) => {
        setDays(res.data.workdays);
      })
      .then(() => {
        axios
          .get(`http://192.168.1.105:3000/doctor/workhours/5`)
          .then((res) => {
            setHours(res.data.workhours);
            console.log(hours);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteDay = (id) => {
    axios
      .delete(`http://192.168.1.105:3000/doctor/workdays/${id}`)
      .then((res) => {
        Alert.alert("Delete day", res.data.message, [
          { text: "OK", onPress: () => console.log("OK") },
        ]);
        setDays((prevDays) => prevDays.filter((day) => day.id !== id));
      })
      .catch((err) => console.log(err));
  };
  return !days ? (
    <View>
      <View style={{ marginTop: 30, marginLeft: 20 }}>
        <Text> Please go add your schedule </Text>
      </View>
      <DoctorSchedule />
    </View>
  ) : (
    <View>
      <View style={styles.container}>
        {days.map((day) => (
          <View key={day.id} style={styles.dayContainer}>
            <Text style={styles.dayLabel}>{day.day_of_week}:</Text>
            <Text style={styles.timeLabel}>
              {hours.find((hour) => hour.day_id === day.id)?.start_time} --
            </Text>
            <Text style={styles.timeLabel}>
              {hours.find((hour) => hour.day_id === day.id)?.end_time}
            </Text>
            <Button
              onPress={() => deleteDay(day.id)}
              buttonStyle={styles.deleteButton}
              titleStyle={styles.submitButtonText}
              title="Delete"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayLabel: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
  },
  timeLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default CurrentSchedule;
