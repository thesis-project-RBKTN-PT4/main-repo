import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const RoleSelection = ({ navigation }) => {

  const navigateToDoctorSignUp = () => {
    navigation.navigate('DoctorSignUp', { role: 'doctor' })
  };

  const navigateToPatientSignUp = () => {
    navigation.navigate('Register', { role: 'patient' })
  };
  return (
    <View style={styles.container}>
      <Button
        title="Register as a patient"
        onPress={() => navigateToPatientSignUp()}
      />

      <Button
        title='Register as a doctor'
        onPress={() => navigateToDoctorSignUp()} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  selectedRoleText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelection;
