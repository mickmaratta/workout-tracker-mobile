import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/ui/Header";
import ExerciseLabel from "../components/Workouts/ExerciseLabel";
import Set from "../components/Workouts/Set";
import Button from "../components/ui/Button";
import { Colors } from "../constants/GlobalStyles";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { formatWorkoutDuration } from "../util/helpers";
import { useKeepAwake } from "expo-keep-awake";
import { v4 as uuid } from "uuid";
import { completeDatabaseWorkout } from "../util/http";
import { completeReduxWorkout } from "../redux/completedWorkoutsSlice";
import CompletedWorkoutModal from "../components/Workouts/CompletedWorkoutModal";

const TrackWorkoutScreen = ({ route, navigation }) => {
  const { workout } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const timer = () => {
      !modalVisible && setSeconds(seconds + 1);
    };
    const id = setInterval(timer, 1000);
    setFormattedTime(formatWorkoutDuration(seconds));
    return () => clearInterval(id);
  }, [seconds]);

  function exitAlert() {
    Alert.alert("Exit Workout", "Are you sure you want to exit this workout?", [
      {
        text: "Cancel",
      },
      {
        text: "Exit",
        onPress: () => navigation.navigate("Workouts"),
      },
    ]);
  }

  async function handleCompleteWorkout() {
    const completedWorkout = {
      id: uuid(),
      duration: seconds.toString(),
      workoutId: workout._id,
      createdAt: new Date().getTime(),
    };
    try {
      await completeDatabaseWorkout(currentUser.uid, completedWorkout.id, completedWorkout);
      dispatch(completeReduxWorkout(completedWorkout));
      setModalVisible(true);
      setTimeout(() => navigation.navigate("Workouts"), 3000);
    } catch (error) {
        console.log(error);
    }
  }

  useKeepAwake();
  return (
      <View style={styles.outerContainer}>
        <Header>{workout.title}</Header>
        <Text style={styles.durationText}>
          Workout Duration: {formattedTime}{" "}
        </Text>
        <View style={styles.list}>
          <FlatList
            data={workout.exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <ExerciseLabel exercise={item} />
                {item.sets.map((set) => (
                  <Set key={set.number} set={set} trackWorkout={true} />
                ))}
              </>
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button buttonStyle={styles.cancelButton} onPress={exitAlert}>
            Cancel
          </Button>
          <Button buttonStyle={styles.button} onPress={handleCompleteWorkout}>
            Complete
          </Button>
        </View>
        <CompletedWorkoutModal modalVisible={modalVisible} duration={formattedTime}/>
      </View>

  );
};

export default TrackWorkoutScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  durationText: {
    textAlign: "center",
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 65,
  },
  button: {
    width: "40%",
    marginHorizontal: 10,
  },
  cancelButton: {
    width: "40%",
    backgroundColor: Colors.error500,
  },
});
