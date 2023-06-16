import React from 'react';
import { View, Text } from 'react-native';

const TermsAndConditions = () => {
  return (
    <View>
      <Text style={styles.heading}>Terms and Conditions for Doctor Users</Text>
      <Text style={styles.text}>
        Please read these Terms and Conditions ("Agreement") carefully before accessing or using our platform. This Agreement sets forth the legally binding terms and conditions for doctors ("Users") who access or use our platform (referred to as "Service").
      </Text>

         </View>
  );
};

const styles = {
  heading: {
    marginTop:20,
    marginLeft:5,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
};

export default TermsAndConditions;
