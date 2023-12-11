import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notes from './Notes';
import CreateFolder from './CreateFolderScreen';
import Account from './Account';
import TabBar from '../components/Navbar';
import { HomeTabs } from '../App';


const Tab = createBottomTabNavigator();

const PostLogin = () => {

  return (
    <Tab.Navigator initialRouteName={"home"} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="home" component={HomeTabs} options={{ headerShown: false }} />
      <Tab.Screen name="folder" component={CreateFolder} options={{ headerShown: false }} />
      <Tab.Screen name="camera" component={Notes} options={{ headerShown: false }} />
      <Tab.Screen name="account" component={Account} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default PostLogin