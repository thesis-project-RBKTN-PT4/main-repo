import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorLogin from './screens/LoginScreen/DoctorLogin';
import DoctorSignUp from './screens/SignupScreen/DoctorSignUp';
import EditDoctorProfile from './screens/Profiles/EditDoctorProfile';
import DoctorProfile from './screens/Profiles/DoctorProfile';
import DoctorDetails from './screens/Profiles/DoctorDetails';
import HomeDoctor from './screens/Home/HomeDoctor';
import Home from './screens/Home/Home';
import DoctorSignUp2 from './screens/SignupScreen/DoctorSignUp2';
import Register from './screens/SignupScreen/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorSignUp" component={DoctorSignUp} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorSignUp2" component={DoctorSignUp2} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorLogin" component={DoctorLogin} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorProfile" component={DoctorProfile} />
        <Stack.Screen options={{ headerShown: false }} name="DoctorDetails" component={DoctorDetails} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="HomeDoctor" component={HomeDoctor} />
        <Stack.Screen options={{ headerShown: false }} name="EditDoctorProfile" component={EditDoctorProfile} />
      </Stack.Navigator>
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
