import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/ui/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AllWorkoutsScreen = () => {

  function logoutHandler() {
    signOut(auth);
  }
  return (
    <View>
      <Text>AllWorkoutsScreen</Text>
      <Button onPress={logoutHandler}/>
    </View>
  )
}

export default AllWorkoutsScreen

const styles = StyleSheet.create({})