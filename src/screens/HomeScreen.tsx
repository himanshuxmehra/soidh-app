import React, { useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    useColorScheme,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image
} from 'react-native';
import { useAuthentication } from '../services/AuthenticationContext';
import FoldersList from '../components/FoldersList';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }: any) => {
    const { isLoggedIn, logOut, username, jwtToken, phoneNumber, accountId }: any = useAuthentication();

    useEffect(() => {
        if (!isLoggedIn) {
            // User is already logged in, navigate to Home screen
            navigation.replace('Welcome');
            // return null; // Render nothing if navigating away
        }
    })


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

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator contentContainerStyle={{}} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={[
                isDarkMode ? { backgroundColor: '#0e0f0f' } : { backgroundColor: '#FFF' },
                {
                    flex: 1,
                    overflow: "hidden",
                },
            ]}>
                <StatusBar
                    animated={true}
                    backgroundColor="#FF4D6D"
                    barStyle={'dark-content'}
                    hidden={false}
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 5,
                    paddingHorizontal: 10,
                }}>
                    <Image
                        source={require('../../assets/menu.png')}
                        width={32}
                        height={32}
                    />
                    <Text
                        style={
                            [styles.headingText, styles.darkText, {
                            }]
                        }>
                        SOIDH
                    </Text>
                    <Image
                        source={require('../../assets/user.png')}
                        width={32}
                        height={32}
                    />

                </View>
                <Text style={
                    [styles.welcomeText, styles.darkText]}>
                    Welcome, {username}
                </Text>
                {/* <View style={{ height: 50, paddingLeft: 10 }}>
                    <Text style={{ color: '#A4133C' }}>{phoneNumber}</Text>
                </View> */}
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
                <View style={{height:100}}></View>
            </View>
        </ScrollView>
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
        fontFamily: 'Poppins',
    },
    welcomeText: {
        fontSize: 20,
        paddingHorizontal: 10,
        margin: 4,
        color: '#A4133C',
        fontFamily: 'Poppins-Bold',
        fontStyle: 'italic',
        marginBottom: 10,
        marginTop: 10,

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
