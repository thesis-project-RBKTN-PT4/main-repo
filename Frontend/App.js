import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image ,TouchableOpacity} from 'react-native';
import Otpscreen from './screens/LoginScreen/Otpscreen'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


WebBrowser.maybeCompleteAuthSession();
export default function App() {

  

  return (
    <View style={styles.container}>
     <Otpscreen/>
    </View>
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
