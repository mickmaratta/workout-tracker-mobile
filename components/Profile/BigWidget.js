import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { DonutChart } from "react-native-circular-chart";

const BigWidget = ({ workoutEfficiency }) => {
  const { efficiency, totalSets, completedSets } = workoutEfficiency
  const DATA = [
    {
      name: `${efficiency}%`,
      value: completedSets,
      color: Colors.success300,
    },
    {
      name: `${100 - efficiency}%`,
      value: totalSets - completedSets,
      color: Colors.error700,
    },
  ];

  return (
    <View style={styles.bigWidget}>
      <View style={styles.donutChart}>
        <DonutChart
          data={DATA}
          strokeWidth={15}
          radius={55}
          containerWidth={200}
          containerHeight={150}
          type="butt"
          startAngle={0}
          endAngle={360}
          animationType="fade"
          labelValueStyle={styles.donutLabelValue}
          labelTitleStyle={styles.donutTitleValue}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.labelText}>Efficiency:</Text>
        <Text style={styles.valueText}>{completedSets} / {totalSets}</Text>
        <Text style={styles.smallText}>sets completed</Text>
      </View>
    </View>
  );
};

export default BigWidget;

const styles = StyleSheet.create({
  bigWidget: {
    backgroundColor: Colors.secondary300,
    flexDirection: "row",
    justifyContent: "center",
    height: "40%",
    borderRadius: 20,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  donutChart: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  donutLabelValue: {
    display: 'none'
  },
  donutTitleValue: {
    fontSize: 24
  },
  statsContainer: {
    paddingRight: 20,
    paddingTop: 8,
  },
  labelText: {
    fontWeight: "bold",
    color: Colors.primary500,
    fontSize: 20,
    marginVertical: 10,
  },
  valueText: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 6,
    color: Colors.neutral800,
  },
  smallText: {
    color: Colors.neutral800,
    textAlign: "center"
  }
});
