import React from 'react';
import { View, Text } from 'react-native';

const Appointment = ({ appointment }) => {
  const { name, appointment_date, appointment_time } = appointment;

  return (
    <View>
      <Text>Doctor: {name}</Text>
      <Text>Date: {appointment_date}</Text>
      <Text>Time: {appointment_time}</Text>
    </View>
  );
};

export default Appointment;
