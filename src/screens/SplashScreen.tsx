import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

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
    }, 1000); // 1000 milliseconds (1 seconds) for demonstration purposes
    return () => clearTimeout(fakeLoading); // Clear the timeout if the component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Soidh</Text>
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
