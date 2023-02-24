import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/GlobalStyles'

const Set = ( {set} ) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.boldText]}>{set.number}</Text>
      <Text style={styles.text}>Reps: {set.reps}</Text>
      <Text style={styles.text}>Weight: {set.weight}</Text>
    </View>
  )
}

export default Set

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.neutralGray500,
        marginVertical: 3,
        paddingVertical: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: Colors.neutral100
    }
})