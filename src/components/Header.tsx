import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { COLORS } from '../constants/theme'

const Header = () => {
    return (
        <View style={styles.header}>
            <Image
                source={require('../../assets/soidh-clear.png')}
                width={64}
                height={64}
            />

            <Text
                style={
                    [styles.textLogo]
                }>
                SOIDH
            </Text>
            <Image
                source={require('../../assets/menu.png')}
                width={32}
                height={32}
            />

        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 25,
        paddingHorizontal: 10,
        backgroundColor: COLORS.secondary,
    },
    textLogo: {
        color: COLORS.white,
    },
})