import React, { useContext, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from 'react-native-loading-spinner-overlay';
import { auth } from '../../config.js';
import COLORS from '../../components/Colors';

const RegisterScreen = ({ navigation, route }) => {
  const { role } = route.params;
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [adresse, setAdresse] = useState(null);

  const { register, isLoading } = useContext(AuthContext);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
  <View style={{ flex: 1, marginHorizontal: 22 }}>

    <View style={{ marginVertical: 22 }}>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black
      }}>
        Be close to your doctors
      </Text>

      <Text style={{
        fontSize: 16,
        color: COLORS.black
      }}>Create your account</Text>
    </View>

    <View style={{ marginBottom: 24, marginTop: 12 }}>
      <View style={{
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22
      }}>
        <TextInput
          placeholder="Enter name"
          placeholderTextColor={COLORS.black}
          style={{
            width: "100%"
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

<<<<<<< HEAD
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={adresse}
          placeholder="Enter Adresse"
          onChangeText={(text) => setAdresse(text)}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          placeholder="Enter phone number"
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Register"
          onPress={() => {
            register(name, email, password, adresse, role, phoneNumber);
            navigation.navigate('Otpscreen', { phone: phoneNumber });
          }} />
=======
      <View style={{ marginBottom: 12, marginTop: 12 }}>
        <View style={{
          width: "100%",
          height: 48,
          borderColor: COLORS.black,
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: COLORS.white,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 22
        }}>
          <TextInput
            placeholderTextColor={COLORS.black}
            style={{
              flex: 2, // Add flex: 1 to expand the input
              marginRight: 20 // Add margin to create spacing with the adjacent element
            }}
            value={email}
            placeholder="Enter email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
  
        <View style={{ marginBottom: 12, marginTop: 12 }}>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: COLORS.white,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>
            <TextInput
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%"
              }}
              value={adresse}
              placeholder="Enter Adresse"
              onChangeText={(text) => setAdresse(text)}
            />
          </View>
        </View>
  
        <View style={{ marginBottom: 12, marginTop: 12 }}>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: COLORS.white,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>
            <TextInput
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%"
              }}
              value={phoneNumber}
              placeholder="Entrer phone number"
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>
  
        <View style={{ marginBottom: 12, marginTop: 12 }}>
          <View style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: COLORS.white,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22
          }}>
            <TextInput
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%"
              }}
              value={password}
              placeholder="Enter password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
        </View>
  
        <View style={{ marginBottom: 12 }}>
        
          <Button
          style={{ color: COLORS.white, fontSize: 14 }}
            title="Next"
            onPress={() => {
              register(name, email, password, adresse, role, phoneNumber);
              navigation.navigate('Otpscreen', { phone: phoneNumber });
              handleSignUp();
            }}
          />
        </View>
  
>>>>>>> e17f0bd0a563f2c577d1cf5302c6bdbe81256137
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Already have an account? </Text>
          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
 
  link: {
    color: 'blue',
  },
});

export default RegisterScreen;
