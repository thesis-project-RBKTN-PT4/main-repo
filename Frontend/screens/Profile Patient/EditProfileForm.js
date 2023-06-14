import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './style';

const EditProfileForm = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  useEffect(() => {
    retrieveIdFromLocalStorage();
  }, []);

  const retrieveIdFromLocalStorage = async () => {
    try {
      const savedId = await AsyncStorage.getItem('userId');
      if (savedId) {
        setId(savedId);
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

  const handleSave = () => {
    axios
      .put(`http://192.168.1.16:3000/patient/update/${id}`, { "address": address, "name": name, "phone_number": phone_number })
      .then(response => {
        const { address, name, phone_number } = response.data;
        setName(name);
        setAddress(address);
        setPhoneNumber(phone_number);
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
    handleSave(patient.id, address, name, phone_number);
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
