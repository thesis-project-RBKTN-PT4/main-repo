import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import { fakeSettings } from './FakeSettings';
import { AntDesign, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const Profile = () => {
  const handleLogout = (id) => {
    if (id === 6) {
      // Perform logout action here
      // Example: Clear authentication token or reset user state

      // Navigate to login screen or any other desired screen
    }
  };

  const getIconName = (label) => {
    switch (label) {
      case 'Editing Profile Info':
        return <AntDesign name="edit" size={20} color="#FF5722" />;
      case 'Delete Account':
        return <Ionicons name="ios-trash-outline" size={20} color="#FF5722" />;
      case 'History':
        return <MaterialIcons name="history" size={20} color="#FF5722" />;
      case 'Notifications':
        return <Ionicons name="ios-notifications-outline" size={20} color="#FF5722" />;
      case 'My Appointments':
        return <Ionicons name="ios-calendar-outline" size={20} color="#FF5722" />;
        case 'Logout':
        return <AntDesign name="logout" size={20} color="#FF5722" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Image source={require('../../screens/Profile Patient/hero1.jpg')} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ahmed traia</Text>
          <Text style={styles.userEmail}>ahmed.traia@tunelec.Com.tn</Text>
          <Text>29559745</Text>
        </View>
      </View>
      <FlatList
        data={fakeSettings}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLogout(item.id)}>
            <View style={styles.settingItemContainer}>
              <Text style={styles.settingItemText}>{item.label}</Text>
              {getIconName(item.label)}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;
