import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import WelcomeScreen from './screens/WelcomeScreen';
import OtpScreen from './screens/OtpScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import CreateFolder from './screens/CreateFolderScreen';
import FolderScreen from './screens/FolderScreen';

import { AuthenticationProvider } from './services/AuthenticationContext';
import PostLogin from './screens/PostLogin';
import ImageScreen from './screens/ImageScreen';
import StoryScreen from './screens/StoryScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Otp: { phoneNumber: string };
  Home: any;
  HomeScreen: any,
  CreateFolder: any,
  FolderDetails: { folder_id: string, canEdit: boolean, jwtToken: string },
  ImageScreen: {imageUrl: string},
  StoryScreen: {storyUrl: string},
};


const Stack = createStackNavigator<RootStackParamList>();

export function HomeTabs() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
          <Stack.Screen name="CreateFolder" component={CreateFolder} options={{headerShown:false}} />
          <Stack.Screen name="FolderDetails" component={FolderScreen} options={{headerShown:false}} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerShown:false}} />
        </Stack.Navigator>
  );
}


const App: React.FC = () => {
  return (
    <AuthenticationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StoryScreen" component={StoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={PostLogin} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </AuthenticationProvider>
  );
};

export default App;
