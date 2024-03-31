import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notes from './Notes';
import Account from './Account';
import TabBar from '../components/Navbar';
import { HomeTabs } from '../App';
import Feed from './Feed';
import CameraScreen from './CameraScreen';


const Tab = createBottomTabNavigator();

const PostLogin = () => {

  return (
    <Tab.Navigator initialRouteName={"home"} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="home" component={HomeTabs} options={{ headerShown: false }} />
      <Tab.Screen name="feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="camera" component={CameraScreen} options={{ headerShown: false }} />
      <Tab.Screen name="gallery" component={Notes} options={{ headerShown: false }} />
      <Tab.Screen name="account" component={Account} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default PostLogin