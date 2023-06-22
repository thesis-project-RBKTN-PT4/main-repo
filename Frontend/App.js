import { StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorLogin from './screens/LoginScreen/DoctorLogin';
import DoctorSignUp from './screens/SignupScreen/DoctorSignUp';
import DoctorSignUp2 from './screens/SignupScreen/DoctorSignUp2';
import DoctorDashboard from "./screens/Doctor/DoctorDashboard";
import EditDoctorProfile from './screens/Profiles/EditDoctorProfile';
import DoctorProfile from './screens/Profiles/DoctorProfile';
import DoctorDetails from './screens/Profiles/DoctorDetails';
import HomeDoctor from './screens/Home/HomeDoctor';
import Home from './screens/Home/Home';
import Otpscreen from './screens/LoginScreen/Otpscreen'
import RoleSelection from './screens/LoginScreen/RoleSelection'
import LoginScreen from './screens/Patient/LoginScreen';
import RegisterScreen from './screens/Patient/RegisterScreen'
import { AuthProvider } from './screens/Patient/AuthContext';
import DoctorList from './screens/Patient/DoctorList ';
import Profile from './screens/Profile Patient/Profile';
import EditProfileForm from './screens/Profile Patient/EditProfileForm';
import AppointmentList from './screens/Patient/AppointmentList';
import MakeAppointment from './screens/Patient/MakeAppointment';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen
              options={{ headerShown: false }}
              name="RoleSelection"
              component={RoleSelection}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Otpscreen"
              component={Otpscreen}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AppointmentList"
              component={AppointmentList}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Profile"
              component={Profile}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />

            <Stack.Screen
              name="DoctorList"
              component={DoctorList}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="DoctorLogin"
              component={DoctorLogin}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="DoctorProfile"
              component={DoctorProfile}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="DoctorDashboard"
              component={DoctorDashboard}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DoctorSignUp"
              component={DoctorSignUp}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="DoctorSignUp2"
              component={DoctorSignUp2}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="DoctorDetails"
              component={DoctorDetails}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeDoctor"
              component={HomeDoctor}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="EditDoctorProfile"
              component={EditDoctorProfile}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="EditProfileForm"
              component={EditProfileForm}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="MakeAppointment"
              component={MakeAppointment}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
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
