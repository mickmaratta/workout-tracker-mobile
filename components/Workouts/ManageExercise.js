import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/GlobalStyles";
import Set from "./Set";

const ManageExercise = ({ removeExercise, exercise }) => {
  const [sets, setSets] = useState(exercise.sets.length);

  function handleSets(value) {
    if (value === "minus" && sets > 1) {
      setSets(sets - 1);
      exercise.sets = exercise.sets.filter((set) => set.number !== sets);
    } else if (value === "add") {
      setSets(sets + 1);
      exercise.sets = [
        ...exercise.sets,
        { number: sets + 1, weight: "0", reps: "0" },
      ];
    }
  }

  function handleSetChange(setNumber, type, value) {
    if(type === 'weight') {
      exercise.sets[setNumber-1].weight = value
    } else {
      exercise.sets[setNumber-1].reps = value
    }
  }

  function handleTitleChange(value) {
    exercise.title = value;
  }

  
  
  return (
    <View style={styles.outerContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.titleContainer}>
        <TextInput placeholder={exercise.title} onChangeText={(value) => handleTitleChange(value)} style={styles.titleText} />
        <IconButton icon="remove-circle" color={Colors.error500} size={32} onPress={() => removeExercise(exercise.id)} />
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
      <FlatList
        data={exercise.sets}
        renderItem={({ item }) => <Set set={item} edit={true} setChange={handleSetChange} />}
      />
    </View>
  );
};

export default ManageExercise;

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 26,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection:"row"
  },
  setsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    marginLeft: 12,
  },
  text: {
    fontSize: 18,
  },
});
