import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './style';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileForm = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    retrieveIdFromLocalStorage();
    axios.get("http://192.168.100.171:3000/patient/allPatients").then(response=>setPatients(response.data.patients))
  }, []);

  const retrieveIdFromLocalStorage = async () => {
    try {
      const savedPatient = await AsyncStorage.getItem('patient');
      if (savedPatient) {
        setId(JSON.parse(savedPatient).id);
      }
    } catch (error) {
      console.log('Error retrieving id from localStorage:', error);
    }
  };


  const validInput = (input) => {
    return input !== ''
  }

  const handleSave = (id, address, name, phone_number) => {
    console.log(id)
    body = { }
    if(validInput(name)){
      body.name = name
    } 
    if(validInput(address)){
      body.address = address
    }
    if(validInput(phone_number)){
      body.phone_number = phone_number
    }
    console.log(body)
    axios.put(`http://192.168.100.171:3000/patient/${id}`, body)
      .then(response => {
         console.log(response.data)
        navigation.navigate('Profile');
      })
      .catch(error => {
        console.log('Error saving profile:', error);
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#E0F2FE' }]}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#E0F2FE' }]}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#E0F2FE' }]}
        value={phone_number}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        onPress={() => {
          handleSave(id, address, name, phone_number);
          navigation.navigate("Profile")
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>

      <Button title="Back" onPress={navigation.navigate("Profile")} />
    </View>

  );
};

export default EditProfileForm;
