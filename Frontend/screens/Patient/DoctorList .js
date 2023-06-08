import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import DoctorCard from './DoctorCard';

const DoctorList = ({ category }) => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
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
          },
          {
            id: 3,
            user_id: 3,
            name: "Dr. Mark Johnson",
            specialization: "Neurology",
            experience: 12,
            rating: 4.8,
            address: "789 Elm Street",
            about: "I am a neurologist specialized in diagnosing and treating disorders of the nervous system.",
            x_coordinate: 37.4833,
            y_coordinate: -122.1406,
            picture: null
          },
          {
            id: 4,
            user_id: 4,
            name: "Dr. Emily Williams",
            specialization: "Ophthalmology",
            experience: 9,
            rating: 4.3,
            address: "321 Pine Avenue",
            about: "I am an ophthalmologist specializing in eye care and surgery.",
            x_coordinate: 37.7749,
            y_coordinate: -122.4194,
            picture: null
          },
          {
            id: 5,
            user_id: 5,
            name: "Dr. Andrew Wilson",
            specialization: "Gastroenterology",
            experience: 11,
            rating: 4.6,
            address: "567 Cedar Street",
            about: "I specialize in diagnosing and treating digestive system disorders.",
            x_coordinate: 37.3382,
            y_coordinate: -121.8863,
            picture: null
          },
          {
            id: 6,
            user_id: 6,
            name: "Dr. Olivia Davis",
            specialization: "Psychiatry",
            experience: 7,
            rating: 4.1,
            address: "890 Maple Avenue",
            about: "I am a psychiatrist specializing in mental health and well-being.",
            x_coordinate: 37.4833,
            y_coordinate: -122.1406,
            picture: null
          },
          {
            id: 7,
            user_id: 7,
            name: "Dr. William Taylor",
            specialization: "Endocrinology",
            experience: 14,
            rating: 4.9,
            address: "123 Oak Street",
            about: "I specialize in hormonal disorders and their treatment.",
            x_coordinate: 37.7749,
            y_coordinate: -122.4194,
            picture: null
          },
    ];
    setDoctors(dummyData);
    setFilteredDoctors(dummyData);
  }, [category]);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctors(filteredData);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [searchQuery, doctors]);

  const handleAppointment = (doctor) => {
    console.log(`Appointment booked with Dr. ${doctor.name}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by doctor name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredDoctors.length === 0 ? (
        <Text style={styles.emptyText}>No doctors found for this category.</Text>
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DoctorCard doctor={item} onPress={() => handleAppointment(item)} />
          )}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default DoctorList;
