import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/GlobalStyles";

const Set = ({ set, edit = false }) => {
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(set.weight);
  console.log(typeof set.reps);
  if (edit === true) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.boldText]}>{set.number}</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Reps: </Text>
          <TextInput
            placeholder={reps}
            style={styles.textInput}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Weight: </Text>
          <TextInput
            placeholder={weight}
            style={styles.textInput}
            keyboardType="number-pad"
          />
          <Text style={styles.text}>lbs</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.boldText]}>{set.number}</Text>
      <Text style={styles.text}>Reps: {set.reps}</Text>
      <Text style={styles.text}>Weight: {set.weight}</Text>
    </View>
  );
};

export default Set;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.neutralGray500,
    marginVertical: 3,
    paddingVertical: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    paddingLeft: 5,
    color: Colors.neutral100,
  },
  textInputContainer: {
    flexDirection: "row",
  },
  textInput: {
    fontSize: 16,
  },
});
