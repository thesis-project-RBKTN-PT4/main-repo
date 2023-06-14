import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    // Fetch medical history data from the backend
    axios
      .get('http://api.example.com/patient/medical-history')
      .then(response => {
        setMedicalHistory(response.data);
      })
      .catch(error => {
        console.log('Error fetching medical history:', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDate}>{item.date}</Text>
      <Text style={styles.historyDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical History</Text>
      {medicalHistory.length > 0 ? (
        <FlatList
          data={medicalHistory}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No medical history available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyItem: {
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDescription: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default MedicalHistory;
