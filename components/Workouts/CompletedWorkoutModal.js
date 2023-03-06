import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/GlobalStyles";

const CompletedWorkoutModal = ({modalVisible, duration}) => {
  return (
      <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
    >
        <View style={styles.container}>
            <View style={styles.textContainer}>
            <Text style={styles.text}>Nice Job!</Text>
            <Ionicons name="thumbs-up" size={34} color={Colors.primary700} />
            </View>
          <Text style={styles.timeText}>Workout Time: {duration}</Text>
          </View>
    </Modal>
  );
};

export default CompletedWorkoutModal;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    marginTop: 250,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    backgroundColor: Colors.primary100,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 28,
    color: Colors.primary700,
    margin: 10
  },
  timeText: {
    color: Colors.neutral800,
    fontSize: 18,
    marginTop: 15
  }
});
