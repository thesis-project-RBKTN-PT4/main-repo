import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ArrowBackIcon } from "react-native-vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import EditDoctorProfile from "./EditDoctorProfile";
import DoctorLogin from "../LoginScreen/DoctorLogin";
import COLORS from "../../components/Colors";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";


const DoctorProfile = ({navigation}) => {
  const [doctor,setDoctor] = useState({})
  
  const getDataFromLocalStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value)
        const parsedValue = JSON.parse(value)
        setDoctor(parsedValue)
      } else {
        console.log("No data found for the given key");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  }
  getDataFromLocalStorage("doctor")
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headingContainer}>
     
      <Pressable
        onPress={() => navigation.navigate("DoctorLogin")}

        >
          <Image
            source={require("../../assets/retour.png")}
            style={styles.return}
          />
        </Pressable>

        <Text style={styles.heading}>Profile</Text>
      </View>

      {/* Profile image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/doctor.png")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>DR. {doctor.name}</Text>
      </View>

      {/* Profile about */}
      <View style={styles.aboutContainer}>
        <View>
          <Text style={styles.info}>Experience: {doctor.experience} years</Text>
          <View>
            <Text style={styles.info}>Rate</Text>

            <StarRating
              disabled={false}
              maxStars={5}
              rating={doctor.rating===null?0:Number(doctor.rating)} // Replace with your actual rating value
              starSize={34}
              marginRight={-12}
              fullStarColor="#FFD700"
              emptyStarColor="#CCCCCC"
            />
          </View>
        </View>

        <Text style={styles.info}>About</Text>
        <Text style={styles.infoText}>
          {doctor.about}
        </Text>

        <Pressable onPress={() => navigation.navigate("DoctorDashboard")}>
          <Text style={styles.btn}>Dashboard</Text>
        </Pressable>
     
        <Pressable
        onPress={() => navigation.navigate("EditDoctorProfile", {doctor:doctor})}
        >
          <Text style={styles.btn}>Edit Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  headingContainer: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#1C6BA4",
    height: 170,
    width: "100%",
    paddingVertical: 10,
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -35,
  },
  btn: {
    fontSize: 25,
    marginTop: 30,
    height: 38,
    color: COLORS.white,
    backgroundColor: "#1C6BA4",
    alignContent: "center",
    textAlign: "center",
    borderRadius: 40,
    fontWeight: "bold",
    marginLeft: 6,
  },

  imageContainer: {
    alignContent: "center",
    zIndex: 9999,
    alignItems: "center",
    // marginVertical: 50,
    marginTop: 120,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  aboutContainer: {
    height: "30%",
    width: "95%",
    textAlign: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 30,
    color: "black",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 5,
    color: "black",
  },
  info: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 5,
    color: "black",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "normal",
    paddingVertical: 5,
    color: "black",
  },
  starStyle: {
    marginRight: -3,
  },
  return: {
    height: 40,
    width: 40,
    marginTop: 35,
    marginLeft: -180,
  },
});
