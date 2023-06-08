





import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, Drawer } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorLogin from './screens/LoginScreen/DoctorLogin';
import DoctorSignUp from './screens/SignupScreen/DoctorSignUp';
import EditDoctorProfile from './screens/Profiles/EditDoctorProfile';
import DoctorProfile from './screens/Profiles/DoctorProfile';
import DoctorDetails from './screens/Profiles/DoctorDetails';
import HomeDoctor from './screens/Home/HomeDoctor';
import Home from './screens/Home/Home';
import HomeTest from './screens/LoginScreen/HomeTest'
import Otpscreen from './screens/LoginScreen/Otpscreen'
import Search from './screens/Patient/Search';
import DoctorList from './screens/Patient/Search';
import DoctorCard from './screens/Patient/DoctorCard';

const Stack = createNativeStackNavigator();


export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Search" component={DoctorList} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorProfile" component={DoctorProfile} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorDetails" component={DoctorDetails} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="HomeDoctor" component={HomeDoctor} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorSignUp" component={DoctorSignUp} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen options={{ headerShown: false }} name="EditDoctorProfile" component={EditDoctorProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
