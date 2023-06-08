import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DoctorSignUp from './DoctorSignUp';

const Register = () => {
  const navigation = useNavigation();

  const navigateToDoctorSignUp = () => {
    navigation.navigate('DoctorSignUp');
  };

  return (
    <View>
      <Button title="Register as a doctor" onPress={navigateToDoctorSignUp} />
      {/* <Button title="Go to Component 2" onPress={navigateToComponent2} /> */}
    </View>
  );
};

export default Register;