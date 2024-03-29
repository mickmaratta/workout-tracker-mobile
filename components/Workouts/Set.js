import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/GlobalStyles";
import IconButton from "../ui/IconButton";

const Set = ({ set, edit, setChange, trackWorkout, handleCompletedSets }) => {
  const [reps, setReps] = useState(set.reps);
  const [weight, setWeight] = useState(set.weight);
  const [completedSet, setCompletedSet] = useState(false)
  const [inputs, setInputs] = useState({
    number: set.number,
    reps: set.reps,
    weight: set.weight,
  })

  useEffect(() => {
    edit && setChange(inputs)
  }, [inputs])
  function completedSetHandler() {
    setCompletedSet(!completedSet);
    handleCompletedSets(completedSet);
  };

  function inputChangeHandler(inputIdentifier, enteredAmount) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredAmount
      }
    });
  }

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
            onChangeText={inputChangeHandler.bind(this, 'reps')}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Weight: </Text>
          <TextInput
            placeholder={weight}
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={inputChangeHandler.bind(this, 'weight')}
          />
          <Text style={styles.text}> lbs</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, completedSet && styles.completedSet]}>
      <Text style={[styles.text, styles.boldText]}>{set.number}</Text>
      <Text style={styles.text}>Reps: {set.reps}</Text>
      <Text style={styles.text}>Weight: {set.weight} lbs</Text>
      {trackWorkout && <IconButton
        icon="checkmark-circle-outline"
        color={Colors.success300}
        size={32}
        style={styles.iconButton}
        onPress={completedSetHandler}
      />}
    </View>
  );
};

export default Set;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 2,
    marginHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 20,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  completedSet: {
    backgroundColor: Colors.success500
  },
  boldText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    paddingLeft: 5,
    color: Colors.neutral100,
  },
  textInputContainer: {
    flexDirection: "row",
  },
  textInput: {
    fontSize: 20,
  },
  iconButton: {
    margin: 0,
    padding: 0
  },
});
