import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('HomeDoctor');
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  const isProfileActive = activeTab === 'Profile';

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, isProfileActive && styles.activeTab]}
        onPress={() => {
          handleTabPress('Profile');
          navigation.navigate('Profile');
        }}
      >
        {isProfileActive ? (
          <FontAwesome5 name="user-alt" size={24} color="#007BFF" />
        ) : (
          <FontAwesome5 name="user-alt" size={24} color="black" />
        )}
        <Text style={[styles.tabText, isProfileActive && styles.activeText]}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={[styles.tabButton, activeTab === 'DoctorList' && styles.activeTab]}
  onPress={() => {
    handleTabPress('DoctorList');
  }}
>
  <MaterialCommunityIcons
    name={activeTab === 'DoctorList' ? 'home' : 'home'}
    size={24}
    color={activeTab === 'DoctorList' ? '#1B82C4' : '#808080'}
  />
  <Text style={[styles.tabText, activeTab === 'DoctorList' && styles.activeTabText]}>DoctorList</Text>
</TouchableOpacity>


      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'MakeAppointment' && styles.activeTab]}
        onPress={() => {
          handleTabPress('MakeAppointment');
          navigation.navigate('MakeAppointment');
        }}
      >
        <MaterialCommunityIcons
          name={activeTab === 'Appointment' ? 'calendar-clock' : 'calendar-clock'}
          size={24}
          color={activeTab === 'Appointment' ? '#1B82C4' : '#808080'}
        />
        <Text style={[styles.tabText, activeTab === 'MakeAppointment' && styles.activeTabText]}>Appointment</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goBack}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#F0F0F0',
  },
  tabText: {
    marginTop: 2,
    fontSize: 12,
    color: '#808080',
  },
  activeTabText: {
    color: '#1B82C4',
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B82C4',
    marginRight: 10,
  },
});

export default BottomNavigation;
