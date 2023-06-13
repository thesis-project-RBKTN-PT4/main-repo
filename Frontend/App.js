import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './screens/Profile Patient/BottomNavigation';

import DoctorLogin from './screens/LoginScreen/DoctorLogin';
import DoctorSignUp from './screens/SignupScreen/DoctorSignUp';
import Profile from './screens/Profile Patient/Profile';
import EditDoctorProfile from './screens/Profiles/EditDoctorProfile';
import DoctorProfile from './screens/Profiles/DoctorProfile';
import DoctorDetails from './screens/Profiles/DoctorDetails';
import HomeDoctor from './screens/Home/HomeDoctor';
import MedicalHistory from './screens/Profile Patient/MedicalHistory';
import Home from './screens/Home/Home';
import HomeTest from './screens/LoginScreen/HomeTest';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPatient"
          component={EditDoctorProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DoctorProfile"
          component={DoctorProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DoctorDetails"
          component={DoctorDetails}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeDoctor"
          component={HomeDoctor}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DoctorSignUp"
          component={DoctorSignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DoctorLogin"
          component={DoctorLogin}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditDoctorProfile"
          component={EditDoctorProfile}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="MedicalHistory"
          component={MedicalHistory}
        />
      </Stack.Navigator>

      <BottomNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
