import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image ,TouchableOpacity} from 'react-native';
import Otpscreen from './screens/LoginScreen/Otpscreen'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
//908163619149-vhlg0v12f9ch2j9k2iu7ks4dgsrd3ogl.apps.googleusercontent.com
//908163619149-r04t9j9p90022tvdftf3fpqnbjuep260.apps.googleusercontent.com   ios
//908163619149-1vncg1erpsuh9eo2kb943m8r09qd8jvm.apps.googleusercontent.com    android

WebBrowser.maybeCompleteAuthSession();
export default function App() {

  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "908163619149-vhlg0v12f9ch2j9k2iu7ks4dgsrd3ogl.apps.googleusercontent.com",
    iosClientId: "908163619149-r04t9j9p90022tvdftf3fpqnbjuep260.apps.googleusercontent.com",
    androidClientId: "908163619149-vhlg0v12f9ch2j9k2iu7ks4dgsrd3ogl.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);


  async function fetchUserInfo() {

    let response = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    const useInfo = await response.json();
    setUser(useInfo);

  };

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
          <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
        </View>
      )
    }
  }




  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null &&
      <>
      <Text>welcom to easy-med</Text>
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}>
         <Image source={require("../Frontend/assets/google.png")} style={{width:300,height:70}}/>
        </TouchableOpacity>
      
      </>
        }
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
