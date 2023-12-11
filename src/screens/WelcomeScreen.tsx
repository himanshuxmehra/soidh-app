import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { useAuthentication } from '../services/AuthenticationContext';
import { checkPhoneNumber, generateOtp } from '../services/api';
import ButtonElement from '../elements/Button';
import { Text } from 'react-native-elements';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
  route: WelcomeScreenRouteProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { isLoggedIn, jwtToken } = useAuthentication();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // User is already logged in, navigate to Home screen
      navigation.replace('Home');
      // return null; // Render nothing if navigating away
    }
  }, [])

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




  return (
    <ImageBackground
      style={{ flex: 1, width: '100%' }}
      source={require('../../assets/welcome-background.png')}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome back, we missed you! 
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor='#A4133C'
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity onPress={handlePress}>
          <ButtonElement title='Login'/>
        </TouchableOpacity>
        {loading && <ActivityIndicator style={styles.loader} />}
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  welcomeText:{
    fontSize: 40,
    textAlign: 'center',
    fontWeight:'800',
    margin:20,
    backgroundColor:'#FFF',
    color: '#590D22'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    width:'100%'
  },
  input: {
    height: 50,
    borderColor: '#A4133C',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FFF',
    color: '#A4133C',
    borderRadius: 10,
    fontSize: 14
  },
  loader: {
    marginTop: 20,
  },
});

export default WelcomeScreen;
