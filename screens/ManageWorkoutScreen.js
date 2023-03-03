import {
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
import { addWorkout } from "../util/http";
import { AuthContext } from "../context/AuthContext";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import { addWorkoutSuccess } from "../redux/workoutsSlice";

const ManageWorkoutScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [exercises, setExercises] = useState([]);
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
      exercises: exercises
    };
    try {
      await addWorkout(workoutToAdd, workoutToAdd._id, currentUser.uid);
      dispatch(addWorkoutSuccess(workoutToAdd));
      navigation.navigate('Workouts');
      setTitle('');
      setDesc('');
      setExercises([])
      setIsAdding(false);
    } catch (error) {
      setIsAdding(false);
      setErr(true);
      console.log(error)
    }
  }

   //Loading Screen
   if (isAdding) {
    return <LoadingOverlay message="Adding Workout..." />;
  }

  return (
    <DismissKeyboard>
      <ScrollView>
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
        <Button buttonStyle={styles.editButton} onPress={() => addWorkoutHandler(title, desc, exercises)}>Add Workout</Button>
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
  editButton: {
    marginHorizontal: 20
  },
});
