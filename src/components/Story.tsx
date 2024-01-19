import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Story = () => {
    return (
        <TouchableOpacity>
            <View style={styles.storyContainer}>
            </View>
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
})