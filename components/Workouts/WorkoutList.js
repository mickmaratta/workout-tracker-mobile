import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import WorkoutLabel from "./WorkoutLabel"

const WorkoutList = ({workouts}) => {
  return (
    <View>
      <FlatList 
      data={workouts}
      renderItem={({item}) => <WorkoutLabel workout={item} />}
      keyExtractor={item => item._id}
      />
    </View>
  )
}

export default WorkoutList

const styles = StyleSheet.create({})