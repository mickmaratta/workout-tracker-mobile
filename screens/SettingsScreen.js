import { StyleSheet, View } from 'react-native'
import React from 'react'
import SettingsList from '../components/Settings/SettingsList'

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <SettingsList />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})