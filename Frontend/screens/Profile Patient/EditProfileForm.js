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
      const savedId = await AsyncStorage.getItem('id');
      if (savedId) {
        setId(Number(savedId));
      }
    } catch (error) {
      console.log('Error retrieving id from localStorage:', error);
    }
  };

  const saveIdToLocalStorage = async (id) => {
    try {
      await AsyncStorage.setItem('userId', id);
    } catch (error) {
      console.log('Error saving id to localStorage:', error);
    }
  };

  const validInput = (input) => {
    return input !== ''
  }

  const handleSave = () => {
    console.log(id)
    axios.put(`http://192.168.100.171:3000/patient/${id}`, { "address": address, "name": name, "phone_number": phone_number })
      .then(() => {
         let temp = patients.map(patient => {
           console.log(patient)
           if (patient.id === id) {
             validInput(name) ? { ...patient, name: name } : null
             validInput(address) ? { ...patient, address: address } : null
             validInput(phone_number) ? { ...patient, phone_number: phone_number } : null
           }
         })
         setPatients(temp)
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
          navigation.navigate("Profile");
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>

      <Button title="Back" onPress={handleBack} />
    </View>

  );
};

export default EditProfileForm;
