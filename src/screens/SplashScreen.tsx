import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { checkToken } from '../services/api';
import { useAuthentication } from '../services/AuthenticationContext';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { isLoggedIn, jwtToken, logOut } = useAuthentication();
  console.log(jwtToken)
  useEffect(() => {
    // fix it here
    const checkSession = async (jwtToken: string) => {
      try {
        console.log(jwtToken)

        const response = await checkToken(jwtToken);
        if (response.status === 200 && isLoggedIn) {
          // User is already logged in, navigate to Home screen
          navigation.replace('Home');
        }
      } catch (err) {
        logOut();
        navigation.replace('Welcome');
      }
    }
    checkSession(jwtToken);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, width: '100%' }}
        source={require('../../assets/splash.png')}
        blurRadius={0}
        resizeMode='cover'
      >
      </ImageBackground>
      {/* Add any additional elements or styling as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
