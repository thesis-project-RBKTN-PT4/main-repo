import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import Button from "../../components/Button.js";
import COLORS from "../../components/Colors.js";
import axios from "axios";
import Location from "../../components/Location.js";
import TermsAndConditions from "../../components/TermsAndConditions.js";

const DoctorSignUp2 = ({ route, navigation }) => {
  const { stepOneData } = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [about, setAbout] = useState("");

  const handleSignUp = (name, specialization, experience, about, address) => {
    console.log(stepOneData);
    email = stepOneData.email;
    password = stepOneData.password;
    number = stepOneData.licence;
    phone_number = stepOneData.phone;
    role = stepOneData.role;
    // Include location latitude and longitude in the request
 const { latitude, longitude } = selectedLocation || {};
 
 axios.post("http://192.168.100.171:3000/user", {
        email: email,
        password: password,
        role: role,
        name: name,
        address: address,
        number: number,
        x_coordinate: latitude,
        y_coordinate: longitude,
        specialization: specialization,
        experience: experience,
        phone_number: phone_number,
        about: about,
      })
      .then((response) => {
        console.log(response.data);
        navigation.navigate("DoctorLogin");
      })
      .catch((error) => {
        console.error(error);
        // Additional error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Response status:", error.response.status);
          console.log("Response data:", error.response.data);
        }
      });
  };

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    console.log({ latitude, longitude });
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
    <View style={{ flex: 1, marginHorizontal: 22 }}>
      <View style={{ marginVertical: 22 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: COLORS.black
        }}>
          Be close to your patients
        </Text>
        <Text style={{
          fontSize: 16,
          color: COLORS.black
        }}>Step 2</Text>
      </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your Name"
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your adress"
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 230,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              overflow: "hidden",
              marginTop: 4,
            }}
          >
          <Location 
          selectedLocation={selectedLocation}
          handleMapPress={handleMapPress}
        />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your specialization"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              value={specialization}
              onChangeText={setSpecialization}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your number of years of experience"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",
              }}
              value={experience}
              onChangeText={setExperience}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: COLORS.white,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="About..."
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "100%",
              }}
              value={about}
              onChangeText={setAbout}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Pressable onPress={() => navigation.navigate("TermsAndConditions")}>
        <Text style={{ color: 'blue' }}>Terms and Conditions</Text>
      </Pressable>
        </View>

        <Button
          title="Sign Up"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={() =>
            handleSignUp(name, specialization, Number(experience), about)
          }
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate("DoctorLogin")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorSignUp2;
