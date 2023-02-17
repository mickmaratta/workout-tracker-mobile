import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/ui/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import Title from '../components/ui/Title'
import Header from '../components/Header'
import { Colors } from '../constants/GlobalStyles'

const AllWorkoutsScreen = () => {

  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Workouts</Text>
      </View>
    </View>
  )
}

export default AllWorkoutsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: Colors.neutral800,
    flex: 1,
  }
})