import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {useAuthentication} from '../services/AuthenticationContext';
import {Button} from 'react-native-elements';

const Account = ({navigation}: any) => {
  const {isLoggedIn, logOut, username, phoneNumber}: any = useAuthentication();
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
    <View>
      <View style={styles.settingsHeading}>
        <Text style={styles.settingsHeadingText}>Settings</Text>
      </View>
      <View style={styles.accountList}>
        <Text style={styles.accountText}>Account Details</Text>

        <View style={styles.accountListTab}>
          <Text style={styles.accountListTabText}>{phoneNumber}</Text>
        </View>
        <View style={styles.accountListTab}>
          <Text style={styles.accountListTabText}>{username}</Text>
        </View>
        <View style={styles.accountListTab}>
          <Text style={styles.accountListTabText}>This is a sample text</Text>
        </View>
        <View style={styles.accountListTab}>
          <Text style={styles.accountListTabText}>This is a sample text</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutButton}>
          <Text style={{color: '#FFF'}}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  settingsHeading: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#A4133C',
    height: 70,
    paddingLeft: 30,
    paddingTop: 20,
  },
  settingsHeadingText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '300',
  },
  accountList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  accountText: {
    paddingLeft: 20,
    fontSize: 18,
    color: '#C9184A',
  },
  accountListTab: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFCCD5',
    borderRadius: 15,
  },
  accountListTabText: {
    color: '#A4133C',
    fontWeight: '600',
  },
  logoutButton: {
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#c9184a',
    alignSelf: 'center',
  },
});
