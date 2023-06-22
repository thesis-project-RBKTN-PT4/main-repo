import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import COLORS from "../../components/Colors";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedValue, setSelectedValue] = useState("All");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const patient_ID = JSON.parse(user).patient.id;

      try {
        const response = await axios.get(`http://192.168.100.171:3000/patient/booking/${patient_ID}`);
        const fetchedAppointments = response.data.appointments;

        setAppointments(fetchedAppointments);
        fetchedAppointments.sort(
          (a, b) => new Date(a.appointment_date) - new Date(b.appointment_date)
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);

    const upcomingAppointments = appointments.filter(
      (appointment) => appointment.appointment_date >= currentDate
    );

    const pastAppointments = appointments.filter(
      (appointment) => appointment.appointment_date < currentDate
    );

    if (selectedValue === "All") {
      setFilteredAppointments(appointments);
    } else if (selectedValue === "Passed appointments") {
      setFilteredAppointments(pastAppointments);
    } else {
      setFilteredAppointments(upcomingAppointments);
    }
  }, [appointments, selectedValue]);

  const onCancel = async (id) => {
    try {
      await axios.delete(`http://192.168.100.171:3000/patient/booking/${id}`);
      alert("Appointment canceled successfully.");

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item style={styles.pickerItem} label="All" value="All" />
          <Picker.Item
            style={styles.pickerItem}
            label="Passed appointments"
            value="Passed appointments"
          />
          <Picker.Item
            style={styles.pickerItem}
            label="Future appointments"
            value="Future appointments"
          />
        </Picker>
      </View>
      {filteredAppointments.map((item) => (
        <View style={styles.container} key={item.id}>
          <Text style={styles.time}>Appointment's time: {item.appointment_time}</Text>
          <Text style={styles.details}>Appointment's date: {item.appointment_date}</Text>

          <TouchableOpacity style={styles.button} onPress={() => onCancel(item.id)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  picker: {
    backgroundColor: "#fff",
    height: 40,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pickerItem: {
    fontSize: 16,
  },
});

export default AppointmentList;
