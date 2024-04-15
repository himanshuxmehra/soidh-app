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

  useEffect(() => {
    // Simulate some loading process (e.g., fetching data, initializing resources)
    const fakeLoading = setTimeout(() => {
      clearTimeout(fakeLoading);
      navigation.replace('Welcome');
    }, 1500); // 1000 milliseconds (1 seconds) for demonstration purposes
    return () => clearTimeout(fakeLoading); // Clear the timeout if the component is unmounted
  }, [navigation]);


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
