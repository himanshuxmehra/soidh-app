import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { useAuthentication } from '../services/AuthenticationContext';
import { checkPhoneNumber } from '../services/api';
import { Text } from 'react-native-elements';
import { COLORS, SIZES } from '../constants/theme';

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
    <ScrollView>
      <StatusBar backgroundColor={COLORS.secondary} />
      <Image
        style={[{ position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height, zIndex: -1 }]}
        source={require('../../assets/welcome-bg-5.jpg')}
        blurRadius={7}
        resizeMode='cover'
      />
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <Image source={require('../../assets/soidh-clear.png')} style={{ width: 150, height: 150 }} />
          <Text style={styles.subtitle}>New world to share and keep memories ✨</Text>
        </View>
        <View style={styles.dataContainer}>
          <TextInput
            placeholder='Mobile No.'
            style={styles.textinput}
            placeholderTextColor={COLORS.white}
            value={phoneNumber}
            onChangeText={setPhoneNumber} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.button1}>
              <Text style={styles.btnText}>GET OTP</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

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
  loader: {
    marginTop: 20,
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h1 * 1.5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(20, 20, 20, 0.1)',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(20, 20, 20, 0.1)',
  },
  dataContainer: {
    marginTop: 10,
  },
  textinput: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginVertical: 5,
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

});

export default WelcomeScreen;
