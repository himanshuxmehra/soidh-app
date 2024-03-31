import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, ImageBackground, StyleSheet, StatusBar, Dimensions, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useAuthentication } from '../services/AuthenticationContext';

import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { generateOtp, verifyOtp } from '../services/api';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../constants/theme';

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
    if (isLoggedIn) {
      // User is already logged in, navigate to Home screen
      navigation.replace('Home');
      // return null; // Render nothing if navigating away
    }
  }, []); // Include phoneNumber as a dependency

  const handleTextChange = (newText : string) => {
    // Ensure only numeric characters are allowed
    const filteredText = newText.replace(/[^0-9]/g, '');

    // Limit the input to 6 characters
    const limitedText = filteredText.substring(0, 6);

    setOtp(limitedText);
  };

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
          navigation.push('Home');
        }
      } else {
        Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      }
    }
  };


  return (
    <ImageBackground
      style={[{ position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height, zIndex: -1 }]}
      source={require('../../assets/welcome-bg-5.jpg')}
      blurRadius={7}
    >
      <ScrollView>
        <StatusBar backgroundColor={COLORS.secondary} />

        <View style={styles.overlay}>
          <View style={styles.topContainer}>
            <Text style={styles.welcomeText}>
              One Step Away!
            </Text>
            <Text style={styles.subtitle}>Enter OTP 💬</Text>
          </View>
          <View style={styles.dataContainer}>
            <TextInput
              placeholder='_ _ _ _ _ _'
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              value={otp}
              maxLength={6}
              keyboardType="numeric"
              onChangeText={handleTextChange} />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={handlePress}>
              <View style={styles.button1}>
                <Text style={styles.btnText}>SIGN IN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground >

  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    color: COLORS.white,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 390,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: Dimensions.get('window').height
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
  subtitle: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    paddingHorizontal: 10,
    // backgroundColor: 'rgba(20, 20, 20, 0.1)',
  },
  dataContainer: {
    marginTop: 10,
    textAlign: 'center',
  },
  textinput: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    // backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  btnContainer: {
    marginTop: 10,
  },
  button1: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',

  },
  btnText: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontFamily: 'Poppins-Bold',
  },
})