import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthenticationContextProps {
  isLoggedIn: boolean;
  username: string | null;
  phoneNumber: string | null;
  jwtToken: string | null;
  logIn: (username: string, phoneNumber: string, jwtToken: string) => void;
  logOut: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextProps | undefined>(undefined);

export const AuthenticationProvider = ({ children }:any) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  useEffect(() => {
    // Load authentication status, username, and phoneNumber from AsyncStorage on component mount
    loadAuthenticationStatus();
  }, []);

  const loadAuthenticationStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('isLoggedIn');
      const savedUsername = await AsyncStorage.getItem('username');
      const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      const savedToken = await AsyncStorage.getItem('jwtToken');

      if (status !== null) {
        setLoggedIn(JSON.parse(status));
      }

      if (savedUsername !== null) {
        setUsername(savedUsername);
      }

      if (savedPhoneNumber !== null) {
        setPhoneNumber(savedPhoneNumber);
      }

      if (savedToken !== null) {
        setPhoneNumber(savedToken);
      }
    } catch (error) {
      console.error('Error loading authentication status:', error);
    }
  };

  const logIn = (newUsername: string, newPhoneNumber: string, newJwtToken:string) => {
    setLoggedIn(true);
    setUsername(newUsername);
    setPhoneNumber(newPhoneNumber);
    setJwtToken(newJwtToken);
    // Save authentication status, username, and phoneNumber to AsyncStorage
    saveAuthenticationStatus(true, newUsername, newPhoneNumber, newJwtToken);
  };

  const logOut = () => {
    setLoggedIn(false);
    setUsername(null);
    setPhoneNumber(null);
    setJwtToken(null);
    // Save authentication status, username, and phoneNumber to AsyncStorage
    saveAuthenticationStatus(false, null, null, null);
  };

  const saveAuthenticationStatus = async (
    status: boolean,
    newUsername: string | null,
    newPhoneNumber: string | null,
    newToken: string | null
  ) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(status));
      await AsyncStorage.setItem('username', newUsername || '');
      await AsyncStorage.setItem('phoneNumber', newPhoneNumber || '');
      await AsyncStorage.setItem('jwtToken', newToken || '');

    } catch (error) {
      console.error('Error saving authentication status:', error);
    }
  };

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, username, phoneNumber, jwtToken, logIn, logOut }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextProps => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
};