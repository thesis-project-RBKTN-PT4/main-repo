import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DoctorSchedule = () => {
  const [workdays, setWorkdays] = useState([
    { day: "Monday", active: false, start_time: "", end_time: "" },
    { day: "Tuesday", active: false, start_time: "", end_time: "" },
    { day: "Wednesday", active: false, start_time: "", end_time: "" },
    { day: "Thursday", active: false, start_time: "", end_time: "" },
    { day: "Friday", active: false, start_time: "", end_time: "" },
    { day: "Saturday", active: false, start_time: "", end_time: "" },
    { day: "Sunday", active: false, start_time: "", end_time: "" },
  ]);

  var id;
  const fetchID = async () => {
    const value = await AsyncStorage.getItem("doctor");
    id = JSON.parse(value).id;
    console.log(id);
  };

  const handleWorkdays = (day) => {
    setWorkdays((prevTable) => {
      return prevTable.map((item) =>
        item.day === day ? { ...item, active: !item.active } : item
      );
    });
  };

  const handleStartHourChange = (day, hour) => {
    setWorkdays((prevTable) =>
      prevTable.map((item) =>
        item.day === day ? { ...item, start_time: hour } : item
      )
    );
  };

  const handleEndHourChange = (day, hour) => {
    setWorkdays((prevTable) =>
      prevTable.map((item) =>
        item.day === day ? { ...item, end_time: hour } : item
      )
    );
  };

  const submitSchedule = async () => {
    await fetchID();
    const selectedDays = workdays.filter((e) => e.active);
    console.log(selectedDays);
    selectedDays.map((e) => {
      axios
        .post("http://192.168.1.105:3000/doctor/workdays", {
          day: e.day,
          doctor_id: id,
        })
        .then((res) => {
          axios.post("http://192.168.1.105:3000/doctor/workhours", {
            end_time: e.end_time,
            start_time: e.start_time,
            day_id: res.data.workingday.id,
            doctor_id: id,
          });
        })
        .then(() => {
          Alert.alert("Schedule submit", "Schedule submitted successfully!", [
            {
              text: "Ok",
              onPress: () => console.log("OK"),
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <View style={styles.container}>
      {workdays.map((e, i) => (
        <View key={i}>
          <ListItem
            bottomDivider
            containerStyle={
              e.active ? styles.dayColor : styles.listItemContainer
            }
            onPress={() => handleWorkdays(e.day)}
          >
            <ListItem.Content>
              <ListItem.Title>{e.day}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          {e.active ? (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="starting hour"
                style={styles.input}
                onChangeText={(hour) => handleStartHourChange(e.day, hour)}
              />
              <TextInput
                placeholder="ending hour"
                style={styles.input}
                onChangeText={(hour) => handleEndHourChange(e.day, hour)}
              />
            </View>
          ) : null}
        </View>
      ))}
      <Button
        onPress={submitSchedule}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitButtonText}
        title="Submit my Schedule"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
  },
  listItemContainer: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  dayColor: {
    backgroundColor: "#76b5c5",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 5,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#FF6347", // example color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DoctorSchedule;
