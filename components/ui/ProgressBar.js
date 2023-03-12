import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/GlobalStyles'

const ProgressBar = ({totalSets, completedSets}) => {
    const setsPercent = (completedSets/totalSets*100).toFixed(0)
    console.log(completedSets)
  return (
      <View style={styles.container}>
        <View style={styles.bar}>
            <View style={[styles.barFilled, { width: `${setsPercent}%`}]}></View>
        </View>
      </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    bar: {
        height: 10,
        width: 200,
        borderWidth: 1,
        borderRadius: 20,
    },
    barFilled: {
        backgroundColor: Colors.success300,
        height: '100%',
        borderRadius: 20,
    }
})