import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";

const MediumWidget = ({ longestWorkout, avgWorkoutDuration }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>WORKOUT LENGTH</Text>
    <View style={styles.innerContainer}>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{longestWorkout}</Text>
        <Text style={styles.descText}>Longest Workout</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{avgWorkoutDuration}</Text>
        <Text style={styles.descText}>Average Workout</Text>
      </View>
    </View>
    </View>
  );
};

export default MediumWidget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 15,
  },

  valueText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  descText: {
    fontStyle: "italic",
  }
});
