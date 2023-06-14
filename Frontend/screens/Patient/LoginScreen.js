import React, { useContext, useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from './AuthContext';
import { auth } from '../../config.js'

const LoginScreen = ({  }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { isLoading, login } = useContext(AuthContext);

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace("home")
        }
      })
  
      return unsubscribe
    }, [])
  
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }
    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter email"
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Button
                    title="Login"
                    onPress={
                        handleLogin
                    }
                />

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                        
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D4EDFF',
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

export default LoginScreen;