import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const RoleSelection = ({ onRoleSelected,navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  
  
  const navigateToPatientSignUp = () => {
    navigation.navigate('Register', {role:'patient'})
  };
  return (
    <View style={styles.container}>
      <Button
        title="Patient"
        onPress={() => navigateToPatientSignUp()}
        
        
      />
      <Button
        title="Doctor"
        
        
      />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  selectedRoleText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelection;
