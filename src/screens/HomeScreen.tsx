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
import FoldersList from '../components/FoldersList';

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
    const handlePress = async () => {
        navigation.push('CreateFolder')
    }
    const isDarkMode = useColorScheme() === 'dark';
    console.log(isLoggedIn, logOut, username, jwtToken )
    return (
        <View style={[
            isDarkMode ? { backgroundColor: '#0e0f0f' } : { backgroundColor: '#FFF' },
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
                <Text>{jwtToken}</Text>
            </View>
            <FoldersList jwtToken={jwtToken}/>
            <Button title="Create Folder" onPress={handlePress}/>

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
        color: '#000',
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
