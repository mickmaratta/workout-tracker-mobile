import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/GlobalStyles";
import Set from "./Set";

const ManageExercise = ({ removeExercise, exercise, updateExercise }) => {
  const [sets, setSets] = useState(exercise.sets.length);
  const [updatedExercise, setUpdatedExercise] = useState(exercise);
  const [inputs, setInputs] = useState({
    title: exercise.title,
    sets: exercise.sets,
    id: exercise.id
  })

  useEffect(() => {
    updateExercise(exercise.id, inputs)
  }, [inputs]);


  function handleSets(value) {
    let updatedInputSets = inputs.sets
    if (value === "minus" && sets > 1) {
      setSets(sets - 1);
      updatedInputSets.pop();
    } else if (value === "add") {
      setSets(sets + 1);
      updatedInputSets = [
        ...updatedInputSets,
        { number: sets + 1, weight: "0", reps: "0" },
      ];
    }
    setInputs((curInputValues) => {
      return {...curInputValues, sets: updatedInputSets}
    })
  }

  function inputChangeHandler(inputIdentifier, enteredAmount) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredAmount
      }
    })
    updateExercise(exercise.id, inputs)
  }

  function setInputChangeHandler(enteredAmount) {
    const updatedSets = [...inputs.sets];
    let index = updatedSets.findIndex(set => set.number === enteredAmount.number)
    updatedSets[index] = enteredAmount;
    inputChangeHandler('sets', updatedSets)
    updateExercise(exercise.id, inputs)
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.titleOuterContainer}>
          <View style={styles.titleInnerContainer}>
            <TextInput
              placeholder={exercise.title}
              onChangeText={inputChangeHandler.bind(this, 'title')}
              value={inputs.title}
              style={styles.titleText}
            />
            <IconButton
              icon="remove-circle"
              color={Colors.error500}
              size={32}
              onPress={() => removeExercise(exercise.id)}
            />
          </View>
          <View style={styles.setsContainer}>
            <Text style={styles.text}># of Sets: </Text>
            <IconButton
              onPress={() => handleSets("minus")}
              icon="remove-circle"
              size={32}
              color={sets === 1 ? Colors.neutralGray500 : Colors.neutralGray300}
            />
            <Text style={styles.text}>{sets}</Text>
            <IconButton
              onPress={() => handleSets("add")}
              icon="add-circle"
              size={32}
              color={Colors.neutralGray300}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={exercise.sets}
        renderItem={({ item }) => (
          <Set set={item} edit={true} setChange={setInputChangeHandler} />
        )}
      />
    </View>
  );
};

export default ManageExercise;

const styles = StyleSheet.create({
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleOuterContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 25,
    marginLeft: 15,
  },
  titleInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  setsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
  },
  text: {
    fontSize: 18,
  },
});
