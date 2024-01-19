import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Story from './Story'

const Stories = () => {
    return (
        <View style={styles.container}>
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
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