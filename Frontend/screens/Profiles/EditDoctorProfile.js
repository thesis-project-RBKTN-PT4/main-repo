import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../components/Colors.js';
import axios from 'axios';

const EditDoctorProfile = ({ route, navigation }) => {
  const { doctor } = route.params
  const [updated, setUpdated] = useState('false')
  const [doctorList, setDoctorList] = useState([])
  const [name, setName] = useState('')
  const [experience, setExperience] = useState('')
  const [address, setAddress] = useState('')
  const [about, setAbout] = useState('')
  // const [picture, setPicture] = useState('')

  useEffect(() => {
    axios.get('http://192.168.100.171:3000/doctor/all')
      .then(response => setDoctorList(response.data.doctors))
      .catch(error => {
        console.error(error)
      })
  },[updated])
  
  const validInput=(input)=>{
    return input!==''
  }
  const handleSaveProfile = (id, name, experience, address, about) => {
    axios.put(`http://192.168.100.171:3000/doctor/${id}`, { "name": name, "experience": experience, "address": address, "about": about })
      .then(response => {
        console.log(response.data)
        doctorList.map(doctor=>{
          if(doctor.id===id){
            validInput(name)?{...doctor,name:name}:null
            validInput(experience)?{...doctor,experience:experience}:null
            validInput(address)?{...doctor,address:address}:null
            validInput(about)?{...doctor,about:about}:null
          }
        });
        setUpdated(!updated)
      })
      .catch(error => {
        console.error(error)
      })
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ flex: 1, marginHorizontal: 22, marginVertical: 22 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12 }}>
          Your Profile
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text>Name:</Text>
          <TextInput
            placeholder={doctor.name}
            onChangeText={setName}
            style={{
              width: '100%',
              backgroundColor: COLORS.white,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>Experience:</Text>
          <TextInput
            placeholder={String(doctor.experience)}
            onChangeText={setExperience}
            style={{
              width: '100%',
              borderColor: COLORS.black,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>Address:</Text>
          <TextInput
            placeholder={doctor.address}
            onChangeText={setAddress}
            style={{
              width: '100%',
              borderColor: COLORS.black,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>About:</Text>
          <TextInput
            placeholder={doctor.about}
            onChangeText={setAbout}
            multiline
            style={{
              width: '100%',
              height: 100,
              borderColor: COLORS.black,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleSaveProfile(doctor.id, name, experience, address, about);
            navigation.navigate("DoctorProfile");
          }}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.white }}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDoctorProfile;
