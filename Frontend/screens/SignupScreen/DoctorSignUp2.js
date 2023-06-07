import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../components/Button.js';
import COLORS from '../../components/Colors.js';

const DoctorSignUp2 = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [experience, setExperience] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [about, setAbout] = useState('');

    const handleSignUp = (email, password, role, name, number, picture, address, specialization, experience, phone_number, about) => {
        axios
        .post('http://192.168.100.171:3000/user', { email, password, role, name, number, picture, address, specialization, experience, phone_number, about })
        .then(response => {
          console.log(response.data);
          //localStorage.setItem("token",response.data.token)
          //localStorage.setItem("name",response.data.doctor.name)
          navigation.navigate("DoctorProfile")
        })
        .catch(error => {
          console.error(error);
        });
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
                    Be close to your patients
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Step 2</Text>
                </View>

                <View style={{ marginBottom: 12, marginTop:24 }}>
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
                            placeholder='Enter your Name'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                            value={name}
                            onChangeText={setName}
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
                            placeholder='Enter your specialization'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            value={specialization}
                            onChangeText={setSpecialization}
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
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>

                        <TextInput
                            placeholder='Enter your number of years of experience'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            value={experience}
                            onChangeText={setExperience}
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
                            placeholder='About...'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "100%"
                            }}
                            value={about}
                            onChangeText={setAbout}
                        /> 
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
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
              
                   
                </View>


                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("DoctorLogin")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DoctorSignUp2