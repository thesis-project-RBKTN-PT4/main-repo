import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import COLORS from '../../components/Colors.js';
import { useNavigation } from '@react-navigation/native';
import DoctorSignUp from './DoctorSignUp.js';

const Register = () => {
  const navigation = useNavigation()
  // const [role, setRole] = useState('patient')

  const navigateToDoctorSignUp = () => {
    navigation.navigate('DoctorSignUp', {role:'doctor'})
  };

  return (
    <View style={styles.container}>
                <View>

                    <Button title='Register as a doctor' onPress={() => navigateToDoctorSignUp()} />
                </View>
                {/* {role==='doctor'?<DoctorSignUp role={role} />:null} */}
            </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  wrapper: {
      width: '80%',
  },
  input: {
      marginBottom: 12,
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: 5,
      paddingHorizontal: 14,
  },
  link: {
      color: COLORS.primary,
  },
});

export default Register;