import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'native-base';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Input
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <Input
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btn} >Login</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
 btn: {
  backgroundColor: '#1367CB', 
  fontWeight:"bold",
  color:"white",
  },
  image: {
    width: '80%',
    height: 100,
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
});

export default DoctorLogin;
