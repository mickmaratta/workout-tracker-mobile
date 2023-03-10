import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/GlobalStyles";
import { DonutChart } from "react-native-circular-chart";

const CompletedWorkoutModal = ({
  modalVisible,
  duration,
  numOfSets,
  completedSets,
}) => {
  const DATA = [
    {
      name: `${((completedSets / numOfSets) * 100).toFixed(0)}%`,
      value:
        completedSets > 0
          ? numOfSets - completedSets === 0
            ? 10000000
            : completedSets
          : 1,
      color: Colors.primary500,
    },
    {
      name: "Sets Not Completed",
      value:
        completedSets > 0
          ? numOfSets - completedSets === 0
            ? 1
            : numOfSets - completedSets
          : 100,
      color:
        numOfSets - completedSets === 0 ? Colors.primary500 : Colors.error700,
    },
  ];

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.successText}>Nice Work!</Text>
          <Ionicons name="checkmark-done" size={34} color={Colors.primary500} />
        </View>

        <Text style={styles.statsText}>Stats:</Text>
        <Text style={styles.text}>Workout Time: {duration}</Text>
        <View style={styles.donutChart}>
          <DonutChart
            data={DATA}
            strokeWidth={15}
            radius={50}
            containerWidth={200}
            containerHeight={150}
            type="butt"
            startAngle={0}
            endAngle={360}
            animationType="fade"
            labelValueStyle={styles.labelValue}
          />
        </View>
        <Text style={styles.text}>
          {completedSets} / {numOfSets} sets completed
        </Text>
      </View>
    </Modal>
  );
};

export default CompletedWorkoutModal;

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginTop: 150,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.secondary300,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    paddingVertical: 50,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    fontSize: 28,
    color: Colors.neutral800,
    fontWeight: "bold",
  },
  statsText: {
    color: Colors.neutral800,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  text: {
    color: Colors.neutral800,
    fontSize: 18,
  },
  donutChart: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  labelValue: {
    display: "none",
  },
});
