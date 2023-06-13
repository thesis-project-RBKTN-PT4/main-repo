import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentSchedule from "./CurrentSchedule";
import MyCalendar from "./MyCalendar";
import { useNavigation } from "@react-navigation/native";
import DoctorSchedule from "./DoctorSchedule";
import Button from "../../components/Button";
import Appointment from "./Appointment";

const DoctorDashboard = () => {
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState(false);
  const [addSchedule, setAddSchedule] = useState(false);
  const [myCalendar, setMyCalendar] = useState(false);
  const [appointments, setAppointments] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchName = async () => {
      const doctor = await AsyncStorage.getItem("doctor");
      const doctorName = JSON.parse(doctor).name;
      setName(doctorName);
    };
    fetchName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DoctorProfile")}
          >
            <Image
              source={require("../../assets/doctor.png")} // Replace with your own logo image source
              style={styles.logo}
            />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Welcome, Dr. {name}</Text>
        </View>
      </View>
      <View style={styles.innerView}>
        <Button
          title={!schedule ? "My Schedule" : "close schedule"}
          filled
          containerStyle={styles.button}
          onPress={() => {
            setSchedule(!schedule);
            setAddSchedule(false);
            setMyCalendar(false);
            setAppointments(false);
          }}
        />
        <Button
          title={!addSchedule ? "Add Schedule" : "finish"}
          filled
          containerStyle={styles.button}
          onPress={() => {
            setAddSchedule(!addSchedule);
            setMyCalendar(false);
            setSchedule(false);
            setAppointments(false);
          }}
        />
        <Button
          title={!myCalendar ? "My Calendar" : "close calendar"}
          filled
          containerStyle={styles.button}
          onPress={() => {
            setMyCalendar(!myCalendar);
            setAddSchedule(false);
            setSchedule(false);
            setAppointments(false);
          }}
        />
        <Button
          title={!appointments ? "My appointments" : "close list"}
          filled
          containerStyle={styles.button}
          onPress={() => {
            setAppointments(!appointments);
            setAddSchedule(false);
            setSchedule(false);
            setMyCalendar(false);
          }}
        />
      </View>
      <ScrollView>
        {schedule && <CurrentSchedule />}
        {myCalendar && <MyCalendar />}
        {addSchedule && <DoctorSchedule />}
        {appointments && <Appointment />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginTop: 40,
    padding: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 60,
  },
  innerView: {
    justifyContent: "space-between",
    width: "70%",
    height: 250,
  },
  header: {
    marginBottom: 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DoctorDashboard;
