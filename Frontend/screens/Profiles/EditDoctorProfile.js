import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../components/Colors.js';

const EditDoctorProfile = ({navigation}) => {
  const [name, setName] = useState('Mehdi');
  const [specialization, setSpecialization] = useState('Cardiologue');
  const [experience, setExperience] = useState('3 ans');
  const [rating, setRating] = useState('');
  const [address, setAddress] = useState('Clinique Zahra, Ezzahra Ben AROUS');
  const [about, setAbout] = useState('Looking at life through the eyes of a tire hub Eating seeds as a pastime activityThe toxicity of our city, our city');
  const [picture, setPicture] = useState('');

  const handleSaveProfile = () => {
 
    console.log('Profile saved:', {
      name,
      specialization,
      experience,
      rating,
      address,
      about,
      picture,
    });
  };

  return (
   <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
   <View style={{ flex: 1, marginHorizontal: 22, marginVertical:22 }}>
   <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12 }}>
    Your Profile
   </Text>

   <View style={{ marginBottom: 12 }}>
     <Text>Name:</Text>
     <TextInput
       value={name}
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
     <Text>Specialization:</Text>
     <TextInput
       value={specialization}
       onChangeText={setSpecialization}
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
     <Text>Experience:</Text>
     <TextInput
       value={experience}
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
       value={address}
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
       value={about}
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

   <View style={{ marginBottom: 12 }}>
     <Text>Picture:</Text>
     <TextInput
       value={picture}
       onChangeText={setPicture}
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
     {picture ? (
       <Image source={{ uri: picture }} style={{ width: 100, height: 100, marginTop: 10 }} />
     ) : null}
   </View>

   <TouchableOpacity
   onPress={() => {
    handleSaveProfile();
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
