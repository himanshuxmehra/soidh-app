import React from 'react';
import {
    View,
    Text,
    Button,
    StatusBar,
    useColorScheme,
    Platform,
    StyleSheet,
} from 'react-native';
import { useAuthentication } from '../services/AuthenticationContext';

const HomeScreen = ({ navigation }: any) => {
    const { isLoggedIn, logOut, username, jwtToken }: any = useAuthentication();
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

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={[
            isDarkMode ? { backgroundColor: '#0e0f0f' } : { backgroundColor: '#0e0f0f' },
            {
                flex: 1,
                overflow: "hidden",
            },
        ]}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={'light-content'}
                hidden={false}
            />
            <Text
                style={
                    [styles.headingText, styles.darkText, {
                        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 35, alignSelf: 'center'
                    }]
                }>
                SOIDH
            </Text>
            
            <Text style={
                [styles.welcomeText, styles.darkText]}>
                Welcome, {username}
            </Text>
            <View style={{height:150}}>
                
            </View>
            <Text  style={
                [styles.darkText]}>{jwtToken}</Text>
            <View style={{height:150}}>
                
            </View>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
    },
    whiteText: {
        color: '#FFFFFF',
    },
    darkText: {
        color: '#FFF',
    },
    headingText: {
        fontSize: 26,
        fontWeight: '200',
        paddingHorizontal: 10,
        margin: 4
    },
    welcomeText: {
        fontSize: 14,
        paddingHorizontal: 10,
        margin: 4
    },
});

export default HomeScreen;
