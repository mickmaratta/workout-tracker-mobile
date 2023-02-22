import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from '../components/ui/SwitchSelector';

const ViewWorkoutScreen = ({route}) => {
    const { workout } = route.params;

  return (
    <View>
        <SwitchSelector left="Collapsed" right="Expanded" />
      <Text>{workout.title}</Text>
    </View>
  )
}

export default ViewWorkoutScreen

const styles = StyleSheet.create({})