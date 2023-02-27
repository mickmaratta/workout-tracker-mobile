import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/ui/Header";
import { Colors } from "../constants/GlobalStyles";
import { DismissKeyboard } from "../util/helpers";
import IconButton from "../components/ui/IconButton";
import ManageExercise from "../components/Workouts/ManageExercise";
import { v4 as uuid } from "uuid";


const ManageWorkoutScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [exercises, setExercises] = useState([]);

  function addNewExercise() {
    const newExercise = {
      title: 'Title',
      sets: [{number: 1, reps: 0, weight: 0}],
      id: uuid()
    }
    setExercises([...exercises, newExercise])
  }
  function addExerciseHandler() {}

  return (
    <DismissKeyboard>
      <View>
        <Header>Add Workout</Header>
        <View style={styles.inputsContainer}>
          <TextInput
            onChangeText={(text) => setTitle(text)}
            placeholder="Workout title"
            value={title}
            style={styles.titleText}
          />
          <TextInput
            onChangeText={(text) => setDesc(text)}
            multiline={true}
            placeholder="Description"
            value={desc}
            style={styles.text}
          />
          {exercises && (
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <ManageExercise addExercise={addExerciseHandler} exercise={item} />
              )}
            />
          )}
          <Pressable
            style={styles.addContainer}
            onPress={() => addNewExercise()}
          >
            <Text style={styles.text}>Add Exercise</Text>
            <IconButton icon="add-circle-outline" size={28} />
          </Pressable>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default ManageWorkoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {
    marginHorizontal: 16,
  },
  titleText: {
    fontSize: 32,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
