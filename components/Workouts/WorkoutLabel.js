import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Colors } from "../../constants/GlobalStyles"


const WorkoutLabel = ({workout, onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [pressed && styles.pressed, styles.container]}>
      <Text style={styles.titleText}>{workout.title}</Text>
      <Text style={styles.descText}>{workout.desc}</Text>
    </Pressable>
  )
}

export default WorkoutLabel

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  container: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.neutralGray500,
    margin: 10,
  },
  titleText: {
    fontSize: 26,
    marginBottom: 10,
    color: Colors.neutral100
  },
  descText: {
    color: Colors.neutral100,
    fontStyle: 'italic',
    marginBottom: 5
  },
})