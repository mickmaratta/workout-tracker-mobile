import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/GlobalStyles";
import { DonutChart } from "react-native-circular-chart";

const LargeWidget = ({ workoutEfficiency, onPress, selectorDesc }) => {
  const { efficiency, totalSets, completedSets } = workoutEfficiency;
  
  const DATA = [
    {
      name: `${efficiency}%`,
      value:
        completedSets > 0
          ? totalSets - completedSets === 0
            ? 10000000
            : completedSets
          : 1,
      color: Colors.primary500,
    },
    {
      name: `${100 - efficiency}%`,
      value:
        completedSets > 0
          ? totalSets - completedSets === 0
            ? 1
            : totalSets - completedSets
          : 100,
      color: Colors.error700,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.donutChart}>
        <DonutChart
          data={DATA}
          strokeWidth={13}
          radius={53}
          containerWidth={200}
          containerHeight={120}
          type="butt"
          startAngle={0}
          endAngle={360}
          animationType="slide"
          labelValueStyle={styles.donutLabelValue}
          labelTitleStyle={styles.donutTitleValue}
        />
        <Text style={styles.percentText}>{efficiency}%</Text>
      </View>
      <View style={styles.statsContainer}>
        <View>

        <Text style={styles.valueText}>
          {completedSets} / {totalSets}
        </Text>
        <Text style={styles.smallText}>sets completed</Text>
        </View>
        <View style={styles.selectorContainer}>
          <Pressable style={({pressed}) => [styles.selector, pressed && styles.pressed]} onPress={() => onPress(selectorDesc)}>
            <Text style={styles.selectorText}>{selectorDesc}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LargeWidget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary300,
    flexDirection: "row",
    justifyContent: "center",
    height: "30%",
    borderRadius: 20,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  donutChart: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  donutLabelValue: {
    display: "none",
  },
  donutTitleValue: {
    display: "none",
  },
  percentText: {
    color: Colors.primary500,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
  },
  statsContainer: {
    paddingRight: 20,
    paddingTop: 10,
    justifyContent: "space-around",
  },
  valueText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 6,
    color: Colors.primary500,
  },
  smallText: {
    color: Colors.primary500,
    textAlign: "center",
  },
  selectorContainer: {
    justifyContent: "center",
  },
  selector: {
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.primary500
  },
  selectorText: {
    color: Colors.primary500,
  },
  pressed: {
    opacity: 0.5
  }
});
