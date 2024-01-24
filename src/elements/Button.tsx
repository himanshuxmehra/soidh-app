import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const ButtonElement = ({title} : {title:string}) => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  )
}

export default ButtonElement

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        width: '100%',
        alignItems: 'flex-start',
        padding: 5,
        backgroundColor: COLORS.secondary,
        // margin: 5,
    },
    buttonText: {
        color: COLORS.white,
        width:'100%',
        fontSize:15,
        textAlign:'center',
    }
})