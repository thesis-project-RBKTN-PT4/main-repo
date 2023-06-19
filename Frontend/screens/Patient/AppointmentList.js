import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import COLORS from "../../components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [upcommingApp, setUpcomingApp] = useState([]);
  const [pastApp, setPastApp] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  var patient_ID;
  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem('userInfo')
      patient_ID = JSON.parse(user).patient.id;
      console.log(patient_ID, user)
      axios
        .get(`http://192.168.100.171:3000/patient/booking/${patient_ID}`).then(res => setAppointments(res.data.appointments))
        .catch((err) => console.log(err.message));
      appointments?.sort(
        (a, b) => new Date(a.appointment_date) - new Date(b.appointment_date)
      );
    };
    fetchData();
  }, []);
  console.log(appointments, "test")
  const onCancel = (id) => {
    console.log(id)
    axios
      .delete(`http://192.168.100.171:3000/patient/booking/${id}`)
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

  useEffect(() => {
    setUpcomingApp(appointments.filter(e => e.appointment_date >= new Date().toISOString().slice(0, 10)));
    setPastApp(appointments.filter(e => e.appointment_date < new Date().toISOString().slice(0, 10)));
  }, []);

  let mapArray = []
  if(selectedValue===""){
    mapArray = []
  }
  else if(selectedValue==="All"){
    mapArray = [...appointments]
  }
  else if(selectedValue==="Passed appointments"){
    mapArray = [...pastApp]
  }
  else{
    mapArray = [...upcommingApp]
  }
  return (
    <ScrollView style={{marginTop:50}}>
      <View>
        <Picker style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item style={styles.pickerItem} label="All" value="All" />
          <Picker.Item style={styles.pickerItem} label="Passed appointments" value="Passed appointments" />
          <Picker.Item style={styles.pickerItem} label="Future appointments" value="Future appointments" />
        </Picker>
      </View>
      {mapArray?.map((item) => (
        <View style={styles.container} key={item.id}>
          <Text style={styles.time}>
            Appointment's time: {item.appointment_time}
          </Text>
          <Text style={styles.details}>
            Appointment's date: {item.appointment_date}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onCancel(item.id)}
          >
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