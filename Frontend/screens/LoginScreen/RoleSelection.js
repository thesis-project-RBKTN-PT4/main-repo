import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';

const RoleSelection = ({ navigation }) => {

  const navigateToPatientSignUp = () => {
    navigation.navigate('Register', { role: 'patient' });
  };
  const navigateToDoctorSignUp = () => {
    navigation.navigate('DoctorSignUp', { role: 'doctor' })
  };

 
  return (
    
    <ImageBackground
      source={require('../../assets/health.png')}
      style={styles.backgroundImage}
    >

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="i am  a patient" onPress={navigateToPatientSignUp} />
          <Button title="i am a doctor"  onPress={navigateToDoctorSignUp}/>
          
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '90%',
    marginLeft:0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  selectedRoleText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelection;
