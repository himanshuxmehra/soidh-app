import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ContentLoader, { Rect } from 'react-content-loader/native'

interface StoryProps {
    profileImage: string,
    storyMedia: string,
    navigation: any,
}

const Story: React.FC<StoryProps> = ({ navigation, profileImage, storyMedia }) => {
    let [loading, setLoading] = useState<boolean>(true);
    const fakeLoading = setTimeout(() => {
        setLoading(false);
        clearTimeout(fakeLoading);
    }, 5000); // 1000 milliseconds (1 seconds) for demonstration purposes
    return (
        <TouchableOpacity onPress={() => {
            navigation.push('StoryScreen', {
                storyUrl: `${storyMedia}`
            })
        }}>
            {loading ? <ContentLoader
                style={styles.storyLoader}
                speed={2}
                width={64}
                height={64}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <Rect x="0" y="0" rx="64" ry="64" width="64" height="64" />
            </ContentLoader> : <View style={styles.storyContainer}>
                <Image
                    source={{ uri: `${profileImage}` }}
                    style={styles.storyProfilePhoto}
                />
            </View>}
        </TouchableOpacity>
    )
}

export default Story

const styles = StyleSheet.create({
    storyContainer: {
        backgroundColor: COLORS.medBg,
        width: 64,
        height: 64,
        borderRadius: 100,
        marginRight: 5,
        marginLeft: 5,
        marginVertical: 5,
    },
    storyLoader: {
        width: 64,
        height: 64,
        borderRadius: 100,
        marginRight: 5,
        marginLeft: 5,
        marginVertical: 5,
    },
    storyProfilePhoto: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
})