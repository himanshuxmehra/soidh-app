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
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }: any) => {
    const { isLoggedIn, logOut, username, jwtToken, phoneNumber, accountId }: any = useAuthentication();
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
    console.log(isLoggedIn, logOut, username, jwtToken)
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
                        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 35, alignSelf: 'center',
                    }]
                }>
                SOIDH
            </Text>

            <Text style={
                [styles.welcomeText, styles.darkText]}>
                Welcome, {username}
            </Text>
            <View style={{ height: 50, paddingLeft: 10 }}>
                <Text style={{ color: '#A4133C' }}>{phoneNumber}</Text>
            </View>
            <FoldersList navigation={navigation} jwtToken={jwtToken} phoneNumber={phoneNumber} accountId={accountId} />
            <View style={{ height: 30 }}>
            </View>

            <TouchableOpacity onPress={handlePress}>
                <View style={styles.logoutButton}>
                    <Text style={{ color: '#FFF' }}>Create Folder</Text>
                </View>
            </TouchableOpacity>
            <View style={{ height: 30 }}>

            </View>

            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.logoutButton}>
                    <Text style={{ color: '#FFF' }}>Logout</Text>
                </View>
            </TouchableOpacity>
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
        // color: '#000',
    },
    headingText: {
        fontSize: 26,
        fontWeight: '300',
        paddingHorizontal: 10,
        margin: 4,
        color: '#590D22',
    },
    welcomeText: {
        fontSize: 14,
        paddingHorizontal: 10,
        margin: 4,
        color: '#A4133C'
    },
    logoutButton: {
        borderRadius: 20,
        width: '90%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#c9184a',
        alignSelf: 'center'
    }
});

export default HomeScreen;
