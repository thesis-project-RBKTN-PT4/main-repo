import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const DoctorList = ({ category }) => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [categoryQuery, setCategoryQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.38:3000/admin/doctorsList'); 
        const data = response.data;
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (searchQuery || categoryQuery) {
      const filteredData = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        doctor.specialization.toLowerCase().includes(categoryQuery.toLowerCase())
      );

      setFilteredDoctors(filteredData);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [searchQuery, categoryQuery, doctors]);

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
      <TextInput
        style={styles.searchInput}
        placeholder="Search by category"
        value={categoryQuery}
        onChangeText={setCategoryQuery}
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
    backgroundColor: '#D4EDFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginTop: 28,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default DoctorList;
