import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuthentication } from '../services/AuthenticationContext';

import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { generateOtp, verifyOtp } from '../services/api';

type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;

interface OtpScreenProps {
  navigation: OtpScreenNavigationProp;
  route: OtpScreenRouteProp;
}

const OtpScreen: React.FC<OtpScreenProps> = ({ navigation, route }) => {
  const { isLoggedIn, logIn } = useAuthentication();
  const [otp, setOtp] = useState('');
  const [rotp, setROtp] = useState('');
  const { phoneNumber } = route.params;

  useEffect(() => {
    // Make the generateOtp API call when the component mounts
    const fetchOtp = async () => {
      try {
        const response = await generateOtp(phoneNumber);

        // Handle the response as needed
        if (response.success) {
          // Optionally, you can do something with the generated OTP
          console.log('Generated OTP:', response.data.otp);
          setROtp(response.data.otp);
          console.log(rotp);
        } else {
          Alert.alert('Error', response.message || 'An error occurred while generating OTP.');
        }
      } catch (error) {
        console.error('Error in generateOtp call:', error);
        Alert.alert('Error', 'An error occurred while generating OTP.');
      }
    };

    fetchOtp(); // Call the function when the component mounts

  }, []); // Include phoneNumber as a dependency

  const handlePress = async () => {
    // Validate OTP
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      // You can implement logic to verify the OTP here
      // For simplicity, let's assume OTP verification is successful
      const response = await verifyOtp(phoneNumber, otp);

      if (response.success) {
        if (!isLoggedIn) {
          const jwtToken = response.data.token;
          const accountId = String(response.data.accountId);

          // Generating Random Usernames 
          // ToDo: this can move after otp is entered
          const customConfig: Config = {
            dictionaries: [adjectives, colors, animals],
            separator: '',
            length: 3,
            style: 'capital',
          };
          console.log("success", rotp)
          const shortName: string = uniqueNamesGenerator(customConfig);
          
          logIn(shortName, phoneNumber, jwtToken, accountId);
          navigation.replace('Home');
        }
      } else {
        Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      }
    }
  };

  if (isLoggedIn) {
    // User is already logged in, navigate to Home screen
    navigation.replace('Home');
    return null; // Render nothing if navigating away
  }

  return (
    <View>
      <TextInput placeholder="Enter OTP" keyboardType="numeric" value={otp} onChangeText={setOtp} />
      <Button title="Submit" onPress={handlePress} />
    </View>
  );
};

export default OtpScreen;
