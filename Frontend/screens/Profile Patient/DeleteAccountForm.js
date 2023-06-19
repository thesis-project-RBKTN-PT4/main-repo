import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import styles from './style';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const DeleteAccountForm = () => {
  const navigation = useNavigation()
  const handleDelete = async () => {
    const savedPatient = await AsyncStorage.getItem('patient')
    console.log(JSON.parse(savedPatient).userId)
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.100.171:3000/user/${JSON.parse(savedPatient).userId}`)
              .then(response => {
                Alert.alert(response.data)
                navigation.navigate("Register")
              })
              .catch(error => {
                console.log('Error deleting account:', error);
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Delete Account:</Text>
      <Text style={styles.description}>
        By deleting your account, all of your information and data will be permanently removed. This action cannot be undone.
      </Text>

      <Button title="Delete Account" onPress={()=>handleDelete()} color="#FF0000" />
    </View>
  );
};

export default DeleteAccountForm;
