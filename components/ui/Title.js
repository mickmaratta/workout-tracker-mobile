import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/GlobalStyles'

const Title = ({children, style}) => {
  return (
      <Text style={[styles.title, style]}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        marginTop: 12,
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.neutral800,
        textAlign: "center",
        width: "100%",
      }
})