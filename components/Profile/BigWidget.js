import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";
import { useSelector } from "react-redux";
import { allCompletedWorkouts } from "../../redux/completedWorkoutsSlice";

const BigWidget = ({ numOfWorkouts }) => {
  
  return (
    <View style={styles.bigWidget}>
      <Text style={[styles.text, styles.textBold]}>Total Workouts Completed: </Text>
      <Text style={styles.text}>{numOfWorkouts}</Text>
      
    </View>
  );
};

export default BigWidget;

const styles = StyleSheet.create({
  bigWidget: {
    backgroundColor: Colors.secondary300,
    justifyContent: 'space-between',
    height: 120,
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  text: {
    color: Colors.primary700,
    fontSize: 20,
    marginVertical: 20,
    marginLeft: 15,
  },
  textBold: {
    fontWeight: 'bold',
  }
});
