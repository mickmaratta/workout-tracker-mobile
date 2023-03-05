import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Header from "../components/ui/Header";
import { Colors } from "../constants/GlobalStyles";
import { DismissKeyboard } from "../util/helpers";
import IconButton from "../components/ui/IconButton";
import ManageExercise from "../components/Workouts/ManageExercise";
import { v4 as uuid } from "uuid";
import Button from "../components/ui/Button";
import { addDatabaseWorkout, updateDatabaseWorkout } from "../util/http";
import { AuthContext } from "../context/AuthContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import { addReduxWorkout, updateReduxWorkout } from "../redux/workoutsSlice";

const ManageWorkoutScreen = ({ navigation, route }) => {
  const  workout  = route.params?.workout
  const [edit, setEdit] = useState(!!route.params);
  const [title, setTitle] = useState(edit ? workout.title : "");
  const [desc, setDesc] = useState(edit ? workout.desc : "");
  const [exercises, setExercises] = useState(edit ? workout.exercises : []);
  const [isAdding, setIsAdding] = useState(false);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  function addNewExercise() {
    const newExercise = {
      title: "Exercise",
      sets: [{ number: 1, reps: "0", weight: "0" }],
      id: uuid(),
    };
    setExercises([...exercises, newExercise]);
  }

  function removeExerciseHandler(id) {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  }

  async function addWorkoutHandler(title, desc, exercises) {
    setIsAdding(true);
    const workoutToAdd = {
      _id: uuid(),
      createdAt: new Date().getTime(),
      title: title,
      desc: desc,
      exercises: exercises,
    };
    try {
      await addDatabaseWorkout(workoutToAdd, workoutToAdd._id, currentUser.uid);
      dispatch(addReduxWorkout(workoutToAdd));
      navigation.navigate("Workouts");
      setTitle("");
      setDesc("");
      setExercises([]);
      setIsAdding(false);
    } catch (error) {
      setIsAdding(false);
      setErr(true);
    }
  }

  async function updateWorkoutHandler(title, desc, exercises) {
    setIsAdding(true);
    const workoutToUpdate = {
      _id: workout._id,
      createdAt: workout.createdAt,
      updatedAt: new Date().getTime(),
      title: title,
      desc: desc,
      exercises: exercises
    }
    try {
      await updateDatabaseWorkout(workoutToUpdate, workout._id, currentUser.uid);
      dispatch(updateReduxWorkout(workoutToUpdate));
      navigation.navigate("Workouts");
    } catch (error) {
      setIsAdding(false);
      setErr(true);
    }
  }

  function cancelHandler() {
    Alert.alert('Unsaved changes', 'All unsaved changes will be lost.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('Workouts')},
    ]);
  }
  //Loading Screen
  if (isAdding) {
    const message = edit ? "Updating Workout..." : "Adding Workout...";
    return <LoadingOverlay message={message} />;
  }

  return (
    <DismissKeyboard>
      <ScrollView>
        <Header back={edit}>{edit ? 'Edit Workout' : 'Add Workout'}</Header>
        <View style={styles.inputsContainer}>
          <TextInput
            onChangeText={(text) => setTitle(text)}
            placeholder={edit ? workout.title : "Workout Title"}
            value={title}
            style={styles.titleText}
          />
          <TextInput
            onChangeText={(text) => setDesc(text)}
            multiline={true}
            placeholder={edit ? workout.desc : "Description"}
            value={desc}
            style={styles.text}
          />
          {exercises && (
            <FlatList
              scrollEnabled={false}
              data={exercises}
              renderItem={({ item }) => (
                <ManageExercise
                  removeExercise={removeExerciseHandler}
                  exercise={item}
                />
              )}
            />
          )}
          <Pressable
            style={({ pressed }) => [
              styles.addContainer,
              pressed && styles.pressed,
            ]}
            onPress={() => addNewExercise()}
          >
            <Text style={styles.text}>Add Exercise</Text>
            <IconButton icon="add-circle" size={28} color={Colors.primary500} />
          </Pressable>
        </View>

        <View>
          <IconButton />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            onPress={() => edit ? updateWorkoutHandler(title, desc, exercises) : addWorkoutHandler(title, desc, exercises)}
          >
            {edit ? "Save Changes" : "Add Workout"}
          </Button>
          {edit && <Button buttonStyle={[styles.button, styles.cancelButton]} onPress={cancelHandler}>Cancel</Button>}
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

export default ManageWorkoutScreen;

const styles = StyleSheet.create({
  inputsContainer: {},
  titleText: {
    fontSize: 32,
    marginBottom: 10,
    paddingLeft: 12,
  },
  text: {
    paddingLeft: 12,
    fontSize: 20,
  },
  addContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: "40%",
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: Colors.error500,
  }
});
