import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/GlobalStyles'

const ExerciseLabel = ({exercise}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{exercise.title}</Text>
      <Text style={styles.setsText}>{exercise.sets.length} sets</Text>
    </View>
  )
}

export default ExerciseLabel

const styles = StyleSheet.create({
    container: {
        borderBottomColor: Colors.neutralGray500,
        borderBottomWidth: 2,
        margin: 10
    },
    titleText: {
        fontSize: 24,
        color: Colors.secondary300,
        marginBottom: 8,
    },
    setsText: {
        fontSize: 16,
        color: Colors.neutralGray300,
        marginBottom: 3,
    },
})