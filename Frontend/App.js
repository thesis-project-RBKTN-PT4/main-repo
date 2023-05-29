import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import DoctorLogin from './screens/LoginScreen/DoctorLogin';
export default function App() {
  return (
    <NativeBaseProvider>
    <DoctorLogin />
  </NativeBaseProvider>
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
