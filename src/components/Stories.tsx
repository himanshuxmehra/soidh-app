import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Story from './Story'
import { useNavigation } from '@react-navigation/native';

interface StoriesProps {
    jwtToken: string,
}


const Stories: React.FC<StoriesProps> = ({ jwtToken }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Story navigation={navigation}  jwtToken={jwtToken}  profileImage='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' storyMedia='https://images.unsplash.com/photo-1513097847644-f00cfe868607?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <Story navigation={navigation}  jwtToken={jwtToken}  profileImage='https://plus.unsplash.com/premium_photo-1664541337092-81ad747fc1f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' storyMedia='https://plus.unsplash.com/premium_photo-1661547941185-b12ec9f5515d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMGRvaW5nJTIwYWN0aXZpdHl8ZW58MHwxfDB8fHww' />
            <Story navigation={navigation}  jwtToken={jwtToken}  profileImage='https://images.unsplash.com/photo-1679679008383-6f778fe07828?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww' storyMedia='https://images.unsplash.com/photo-1605615647323-3a514a37f464?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBhY3Rpdml0eXxlbnwwfDF8MHx8fDA%3D' />
            <Story navigation={navigation}  jwtToken={jwtToken}  profileImage='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' storyMedia='https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <Story navigation={navigation}  jwtToken={jwtToken}  profileImage='https://plus.unsplash.com/premium_photo-1665941065977-993d9105662a?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' storyMedia='https://images.unsplash.com/photo-1593766827228-8737b4534aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxheWluZyUyMGNyaWNrZXR8ZW58MHwxfDB8fHww' />
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
})