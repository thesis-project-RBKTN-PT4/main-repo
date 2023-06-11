import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from '../../components/Button.js';
import COLORS from '../../components/Colors.js';
import axios from 'axios';

const DoctorLogin = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          if (!email || !password) {
            alert('Error', 'Please fill in all the fields');
            return;
          }
    
          const response = await axios.post('http://localhost:3000/doctor', {
            email,
            password,
          });
    
          // Handle the response and navigate to the appropriate screen
          // based on the API response
          
        } catch (error) {
          console.error('Error:', error);
         alert('Error', 'An error occurred during sign up');
        }
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
                        Welcome back, Doctor!
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Sign in to your account</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
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
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
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
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Login"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={handleLogin}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Or</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("DoctorSignUp")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate("EditDoctorProfile")}
                style={{
                    alignSelf: 'center',
                    backgroundColor: COLORS.primary,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                }}
            >
                <Text style={{ color: COLORS.white, fontSize: 14 }}>Profile</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DoctorLogin;
