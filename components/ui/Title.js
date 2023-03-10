import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/GlobalStyles'

const Title = ({children, style}) => {
  const titleLength = children.length;
  return (
      <Text style={[styles.title, titleLength > 12 && styles.smallTitle, style]}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.neutral800,
        textAlign: "center",
      },
      smallTitle: {
        fontSize: 22,
      }
})