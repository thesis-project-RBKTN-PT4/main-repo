import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './style';

const EditProfileForm = ({ id }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleSave = ({id,name,address,phone_number}) => {
    axios
      .put(`http://192.168.1.16:3000/patient/update/${id}`,    {"address":address, "name":name, "phone_number":phone_number})
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

      <TouchableOpacity onPress = {() => {handleSave ( id,name,address,phone_number)
            navigation.navigate("Profile");}}>

        <Text>Save</Text>
  
      </TouchableOpacity>

      <Button title="Back" onPress={handleBack} />
    </View>
  );
};

export default EditProfileForm;
