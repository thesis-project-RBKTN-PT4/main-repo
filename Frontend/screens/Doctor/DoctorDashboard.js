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
import COLORS from "../../components/Colors";

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
              source={require("../../assets/doctor.png")} 
              style={styles.logo}
            />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Welcome, Dr. {name}</Text>
        </View>
      </View>
      <View style={styles.innerView}>
        <Button
          title={!schedule ? "My Schedule" : "Close Schedule"}
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
          title={!addSchedule ? "Add Schedule" : "Finish"}
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
          title={!myCalendar ? "My Calendar" : "Close Calendar"}
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
          title={!appointments ? "My Appointments" : "Close List"}
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
    backgroundColor: COLORS.bg,
  },
  header: {
    marginTop:24,
    marginBottom: 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
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
    color: COLORS.white, 
  },
  innerView: {
    justifyContent: "space-between",
    width: "70%",
    height: 250,
    alignSelf: "center",
    marginTop: 40,
  },
  button: {
    padding: 15,
    marginBottom: 16,
    backgroundColor: COLORS.secondary, 
    borderRadius: 8,
  },
});

export default DoctorDashboard;
