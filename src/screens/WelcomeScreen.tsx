import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { useAuthentication } from '../services/AuthenticationContext';
import { checkPhoneNumber, generateOtp } from '../services/api';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
  route: WelcomeScreenRouteProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { isLoggedIn } = useAuthentication();
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      // Validate phone number
      if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
        setLoading(true);

        // Make API request
        const response = await checkPhoneNumber(phoneNumber);
        // Check if the component is still mounted before updating state
        if (response.success) {
          setLoading(false);
          console.log("sdafahbfaehbe")
          // Handle the response
          navigation.navigate('Otp', { phoneNumber });
        }
      } else {
        setLoading(false);
        Alert.alert('Invalid phone number', 'Please enter a valid 10-digit phone number.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error in handlePress:', error);
      Alert.alert('Error', 'An error occurred.');
    }
  };


  if (isLoggedIn) {
    // User is already logged in, navigate to Home screen
    navigation.replace('Home');
    return null; // Render nothing if navigating away
  }



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Submit" onPress={handlePress} />
      {loading && <ActivityIndicator style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  loader: {
    marginTop: 20,
  },
});

export default WelcomeScreen;
