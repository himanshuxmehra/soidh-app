import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { useAuthentication } from '../services/AuthenticationContext';
import { Button } from 'react-native-elements';


const Account = ({ navigation }: any) => {
  const { isLoggedIn, logOut, username }: any = useAuthentication();
    if (!isLoggedIn) {
        // User is already logged in, navigate to Home screen
        navigation.replace('Welcome');
        return null; // Render nothing if navigating away
    }
    const handleLogout = () => {
        // Implement logout logic
        logOut();
        navigation.replace('Welcome');
    };

  return (
    <SafeAreaView>
    <View>
      <Text>Notes</Text>
    </View>
    <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({})