import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  var id;
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem("doctor");
      id = JSON.parse(value).id;
      const bookings = await axios.get(
        `http://192.168.1.105:3000/doctor/appointments/${id}`
      );
      const list = bookings.data.appointmentList;
      setAppointments(list);
    };
    fetchData();
  }, []);
  const deleteAppointment = (id) => {
    axios
      .delete(`http://192.168.1.105:3000/doctor/appointments/${id}`)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    setAppointments((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <View>
      {appointments.map((item) => (
        <View key={item.id}>
          <Text>
            Date: {item.appointment_date} Time: {item.appointment_time}
            <Icon
              name="trash"
              size={30}
              color="#CCCCCC"
              onPress={() => deleteAppointment(item.id)}
            />
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Appointment;
