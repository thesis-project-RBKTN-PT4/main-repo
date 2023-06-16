import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {AuthContext}  from './AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { auth } from '../../config.js'




const RegisterScreen = ({navigation,route}) => {
  const {role} = route.params
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const[adresse,setAdresse]=useState(null);

   const {register,isLoading} = useContext(AuthContext);


  const handleSignUp = () => {
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))
}

  return (
    <View style={styles.container}>
       <Spinner visible={isLoading}/> 
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />
         <TextInput
          style={styles.input}
          value={adresse}
          placeholder="Enter Adresse"
          onChangeText={text => setAdresse(text)}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          placeholder="Enter phone number"
          onChangeText={ setPhoneNumber}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

<Button
  title="Register"
  onPress={() => {
    register(name, email, password, adresse, role, phoneNumber);
    navigation.navigate('Otpscreen', { phone: phoneNumber });
    handleSignUp();
  }}
/>


        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D4EDFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    backgroundColor:'white',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default RegisterScreen;