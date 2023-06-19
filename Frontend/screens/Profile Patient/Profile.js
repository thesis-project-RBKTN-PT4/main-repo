import React, { useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import { fakeSettings } from './FakeSettings';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import EditProfileForm from './EditProfileForm';
import DeleteAccountForm from './DeleteAccountForm';
import BottomNavigation from ".././Profile Patient/BottomNavigation";
import AppointmentList from '../Patient/AppointmentList';

const Profile = ({ navigation }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [viewingAppointments, setViewingAppointments] = useState(false); // Add state for viewing appointments

  const handleLogout = (id) => {
    if (id === 6) {
      // Perform logout action here
      // Example: Clear authentication token or reset user state

      // Navigate to login screen or any other desired screen
    }
  };

  const handleEditProfile = () => {
    setEditingProfile(true);
    navigation.navigate('EditProfileForm');
  };

  const handleDeleteAccount = () => {
    setDeletingAccount(true);
    navigation.navigate('DeleteAccountForm');
  };

   const handleViewAppointments = () => {
     setViewingAppointments(true);
     navigation.navigate('AppointmentList');
  };

  const getIconName = (label) => {
    switch (label) {
      case 'Editing Profile Info':
        return <AntDesign name="edit" size={20} color="#003972" />;
      case 'Delete Account':
        return <Ionicons name="ios-trash-outline" size={20} color="#003972" />;
      case 'My Appointments':
        return <Ionicons name="ios-calendar-outline" size={20} color="#003972" />;
      case 'Logout':
        return <AntDesign name="logout" size={20} color="#FF5722" />;
      default:
        return null;
    }
  };

  return (

    <View style={styles.container}>
      {/* header */}
      {/* ... */}
      {editingProfile ? (
        <EditProfileForm />
      ) : deletingAccount ? (
        <DeleteAccountForm />
      ) : viewingAppointments ? ( // Render Appointments component when viewingAppointments is true
        <AppointmentList />
      ) : (
        <FlatList
          data={fakeSettings}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.label === 'Editing Profile Info') {
                  handleEditProfile();
                } else if (item.label === 'Delete Account') {
                  handleDeleteAccount();
                } else if (item.label === 'My Appointments') { // Handle the 'My Appointments' option
                  handleViewAppointments();
                } else {
                  handleLogout(item.id);
                }
              }}
            >
              <View style={styles.settingItemContainer}>
                <Text style={styles.settingItemText}>{item.label}</Text>
                {getIconName(item.label)}
              </View>
            </TouchableOpacity>
          )}
        />
      )}



      <BottomNavigation />
    </View>

  );
};

export default Profile;
