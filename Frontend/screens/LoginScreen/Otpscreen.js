
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert,ImageBackground  } from 'react-native';
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import backgroundImg from '../../assets/logoDoc.jpg';

import RoleSelection from './RoleSelection';


import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


firebase.initializeApp({
    apiKey: "AIzaSyAzVMoT5X1D75D-mBYxeyt-_D2AA6UscqM",
    authDomain: "hellodoctor-592d2.firebaseapp.com",
    projectId: "hellodoctor-592d2",
    storageBucket: "hellodoctor-592d2.appspot.com",
    messagingSenderId: "111159112997",
    appId: "1:111159112997:web:1145942b5a0123fa09d6cc"
});


const Otpscreen = ({route}) => {
    const {phone}=route.params
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const navigation = useNavigation();



    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
        setPhoneNumber('');

    }
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          code
        );
        firebase.auth().signInWithCredential(credential)
          .then(() => {
            setCode('');
            navigation.navigate('RoleSelection');
          })
          .catch((error) => {
            Alert.alert('Error', error.message);
          });
      };


    return (
        <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={{
                    apiKey: "AIzaSyAzVMoT5X1D75D-mBYxeyt-_D2AA6UscqM",
                    authDomain: "hellodoctor-592d2.firebaseapp.com",
                    projectId: "hellodoctor-592d2",
                    storageBucket: "hellodoctor-592d2.appspot.com",
                    messagingSenderId: "111159112997",
                    appId: "1:111159112997:web:1145942b5a0123fa09d6cc"
                }}
            />
            <Text style={styles.otpText}>
                Enter Your Phone Number

            </Text>
            <TextInput
                value={phone}
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.buttonText}>
                    Send Verification Code
                </Text>
            </TouchableOpacity>
            <TextInput
                placeholder='confirm code  '
                onChangeText={setCode}
                keyboardType='number-pad'
                autoCompleteType='tel'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text style={styles.buttonText}>
                    confirm Verification
                </Text>
            </TouchableOpacity>
           

        </View>
        </ImageBackground>

    )
}

export default Otpscreen

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
        ,
        backgroundColor: '#D4EDFF',
        justifyContent: 'center'
    },
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        marginBottom: 20,
        textAlign: 'center',
        color: '#000'
    },
    sendVerification: {
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    sendCode: {
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'

    },
    otpText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20
    }


})