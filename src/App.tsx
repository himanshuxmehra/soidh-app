import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './screens/WelcomeScreen';
import OtpScreen from './screens/OtpScreen';
import HomeScreen from './screens/HomeScreen';

import TabBar from './components/Navbar';

import { AuthenticationProvider } from './services/AuthenticationContext';
import Notes from './screens/Notes';
import Account from './screens/Account';
import SplashScreen from './screens/SplashScreen';


export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Otp: { phoneNumber: string };
  Home: undefined;
};

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName={"home"} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="folder" component={Notes} options={{headerShown:false}} />
      <Tab.Screen name="camera" component={Notes} options={{headerShown:false}} />
      <Tab.Screen name="account" component={Account} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC  = () => {
  return (
    <AuthenticationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
          <Stack.Screen name="Otp" component={OtpScreen} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={HomeTabs} options={{headerShown:false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationProvider>
  );
};

export default App;
