import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../components/Colors';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { AuthContext } from './AuthContext';
import { auth } from '../../config.js';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const { isLoading, login } = useContext(AuthContext);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace('Profile', {id:getPatientId(email)});
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    axios.get("http://192.168.100.171:3000/patient/allUsers").then(response=>setUsers(response.data))
    axios.get("http://192.168.100.171:3000/patient/allPatients").then(response=>setPatients(response.data.patients))
  },[])

  const getPatient = (mail)=>{
    let user = users.filter(user=>user.email===mail)
    if(user){
    let userId = user[0].id
    let patient = patients.filter(patient=>patient.userId===userId)
    if(patient){
    return patient[0]
    }
    }
    }

    const setDataToLocalStorage = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
        console.log("Data set successfully!");
      } catch (error) {
        console.log("Error setting data:", error);
      }
    };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        setDataToLocalStorage("patient", JSON.stringify(getPatient(user.email)))
        navigation.replace('Profile');

      })
      .catch(error => alert(error.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              marginTop: 12, 
              color: COLORS.black,
            }}>
            Welcome back
          </Text>
          <Text style={{ fontSize: 16, color: COLORS.black ,marginBottom: 12}}>
            Sign in to your account
          </Text>
          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                marginBottom: 12,
              }}>
              <TextInput
                value={email}
                placeholder="Enter your mail"
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                }}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                marginBottom: 12,
              }}>
              <TextInput
                placeholderTextColor={COLORS.black}
                style={{
                  width: '100%',
                }}
                value={password}
                placeholder="Enter password"
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
            </View>

            <View style={{ marginBottom: 12 }}>
              <Button
                title="Login"
                onPress={handleLogin}
                style={{ marginTop: 18, marginBottom: 4, }}
              />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>

              <TouchableOpacity
              onPress={()=>navigation.navigate('Register', { role: 'patient' })}
                style={[styles.button, styles.buttonOutline]}>
               <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Sign Up </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4EDFF',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
 
});

export default LoginScreen;
