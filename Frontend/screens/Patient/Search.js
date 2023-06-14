import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DoctorCard from './DoctorCard';

const DoctorList = ({ category }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors by category from your API
    // Here, you can replace the API call with the dummy data you provided
    const dummyData = [
      {
        id: 1,
        user_id: 1,
        name: "Dr. John Smith",
        specialization: "Cardiology",
        experience: 10,
        rating: 4.5,
        address: "123 Main Street",
        about: "I am a cardiologist with extensive experience in treating heart diseases.",
        x_coordinate: 37.7749,
        y_coordinate: -122.4194,
        picture: null
      },
      {
        id: 2,
        user_id: 2,
        name: "Dr. Jane Doe",
        specialization: "Dermatology",
        experience: 8,
        rating: 4.2,
        address: "456 Oak Avenue",
        about: "I specialize in treating skin conditions and providing cosmetic procedures.",
        x_coordinate: 37.3382,
        y_coordinate: -121.8863,
        picture: null
      }
    ];
    setDoctors(dummyData);
  }, [category]);

  return (
    <View style={styles.container}>
      {doctors.length === 0 ? (
        <Text style={styles.emptyText}>No doctors found for this category.</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <DoctorCard doctor={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DoctorList;
