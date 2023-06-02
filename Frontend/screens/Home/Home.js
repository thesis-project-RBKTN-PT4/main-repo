import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../components/Colors";
const Home = ({navigation}) => {
  return (
    <View style={[styles.container, { backgroundColor: COLORS.bg }]}>
      <ScrollView style={styles.scrollView}>
        <Animatable.View
          animation="slideInLeft"
          style={styles.headingContainer}
        >
          <Text style={styles.heading}>Hi, Dr Mouna</Text>
          <Text style={styles.desc}>Welcome Back</Text>
        </Animatable.View>

        <View style={styles.accountActivation}>
        
					<Pressable>
                   
						<Text style={styles.activationText}>
							Your Account is not active, click here to activate
							and connect with your Patients.
						</Text>
					</Pressable>
				</View> 
        <View style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeading}>Your Next Appointment</Text>
          <Pressable
            // onPress={() => navigation.navigate("Appointments")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.cardMore}>See All</Text>
            <MaterialIcons name="read-more" size={24} color="black" />
          </Pressable>
        </View>

        {/* {appointments.length !== 0 && (
					<DoctorAppointmentCard appointment={appointments[0]} />
				)}*/}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 20,
  },

  headingContainer: {
    padding: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.7)",
  },
  desc: {
    fontSize: 18,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 5,
  },
  accountActivation: {
    padding: 5,
    backgroundColor: "#F0AD4E",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  activationText: {
    color: "#702F4F",
    fontSize: 15,
    flexWrap: "wrap",
  },
  cardHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.7)",
  },
  cardMore: {
    color: "rgba(0, 0, 0, 0.7)",
    marginRight: 3,
  },
});
