import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import styles from './style';

const DeleteAccountForm = ({ id }) => {
  const handleDelete = () => {
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
            axios
              .delete(`http://192.168.1.16:3000/patient/delete/${id}`)
              .then(response => {
                // Perform any necessary actions after successful account deletion
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

      <Button title="Delete Account" onPress={handleDelete} color="#FF0000" />
    </View>
  );
};

export default DeleteAccountForm;
