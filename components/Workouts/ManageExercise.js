import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const ManageExercise = ({addExercise, exercise}) => {
  return (
    <View>
      <TextInput 
      placeholder={exercise.title}
      />
    </View>
  )
}

export default ManageExercise

const styles = StyleSheet.create({})