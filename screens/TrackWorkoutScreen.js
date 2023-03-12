import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/ui/Header";
import ExerciseLabel from "../components/Workouts/ExerciseLabel";
import Set from "../components/Workouts/Set";
import Button from "../components/ui/Button";
import { Colors } from "../constants/GlobalStyles";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { calcNumOfSets, formatWorkoutDuration } from "../util/helpers";
import { useKeepAwake } from "expo-keep-awake";
import { v4 as uuid } from "uuid";
import { completeDatabaseWorkout } from "../util/http";
import { completeReduxWorkout } from "../redux/completedWorkoutsSlice";
import CompletedWorkoutModal from "../components/Workouts/CompletedWorkoutModal";
import ProgressBar from "../components/ui/ProgressBar";

const TrackWorkoutScreen = ({ route, navigation }) => {
  const { workout } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const numOfSets = calcNumOfSets(workout.exercises);

  useEffect(() => {
    const timer = () => {
      !modalVisible && setSeconds(seconds + 1);
    };
    const id = setInterval(timer, 1000);
    setFormattedTime(formatWorkoutDuration(seconds));
    return () => clearInterval(id);
  }, [seconds]);

  function handleCompletedSets(completedSet) {
    if (!completedSet) {
      setCompletedSets(completedSets + 1);
    } else {
      setCompletedSets(completedSets - 1);
    }
  }

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
      sets: {
        totalSets: numOfSets,
        completedSets: completedSets
      },
      createdAt: new Date().getTime(),
    };
    try {
      await completeDatabaseWorkout(
        currentUser.uid,
        completedWorkout.id,
        completedWorkout
      );
      dispatch(completeReduxWorkout(completedWorkout));
      setModalVisible(true);
      setTimeout(() => navigation.navigate("Stats"), 5000);
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
      <Text style={styles.setsText}>
        Sets Completed: {completedSets} / {numOfSets}
      </Text>
      <ProgressBar totalSets={numOfSets} completedSets={completedSets} />
      <View style={styles.list}>
        <FlatList
          data={workout.exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <ExerciseLabel exercise={item} />
              {item.sets.map((set) => (
                <Set
                  key={set.number}
                  set={set}
                  trackWorkout={true}
                  handleCompletedSets={handleCompletedSets}
                />
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
      <CompletedWorkoutModal
        modalVisible={modalVisible}
        duration={formattedTime}
        numOfSets={numOfSets}
        completedSets={completedSets}
      />
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  setsText: {
    textAlign: "center",
    fontSize:18,
    marginVertical: 8,
  },
  list: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 65,
    marginTop: 10
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
