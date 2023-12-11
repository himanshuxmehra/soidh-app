import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonElement = ({title}) => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  )
}

export default ButtonElement

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#c9184a',
        margin: 5,
    },
    buttonText: {
        color: '#fff0f3',
        width:'100%',
        fontSize:16,
        textAlign:'center',
    }
})