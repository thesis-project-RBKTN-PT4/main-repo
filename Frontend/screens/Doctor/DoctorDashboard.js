import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import CurrentSchedule from "./CurrentSchedule";
import MyCalendar from "./MyCalendar";
import DoctorSchedule from "./DoctorSchedule";
import Button from "../../components/Button";
import COLORS from "../../components/Colors";
const DoctorDashboard = () => {
  const [schedule, setSchedule] = useState(false);
  const [addSchedule, setAddSchedule] = useState(false);
  const [myCalendar, setMyCalendar] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title={!schedule ? "My Schedule" : "close schedule"}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            marginRight: 5,
          }}
          onPress={() => {
            setSchedule(!schedule);
            setAddSchedule(false);
            setMyCalendar(false);
          }}
        />
        <Button
          title={!addSchedule ? "Add Schedule" : "finish"}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            marginRight: 5,
          }}
          onPress={() => {
            setAddSchedule(!addSchedule);
            setMyCalendar(false);
            setSchedule(false);
          }}
        />
        <Button
          title={!myCalendar ? "My Calendar" : "close calendar"}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            marginRight: 5,
          }}
          onPress={() => {
            setMyCalendar(!myCalendar);
            setAddSchedule(false);
            setSchedule(false);
          }}
        />
      </View>
      <ScrollView>
        {schedule && <CurrentSchedule />}
        {myCalendar && <MyCalendar />}
        {addSchedule && <DoctorSchedule />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    // marginLeft:5
  },
});

export default DoctorDashboard;
