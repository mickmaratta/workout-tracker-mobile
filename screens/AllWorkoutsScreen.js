import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import WorkoutList from "../components/Workouts/WorkoutList";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts, allWorkouts } from "../redux/workoutsSlice";
import Header from "../components/ui/Header";
import { AuthContext } from "../context/AuthContext";
import { fetchDatabaseFavorites, fetchDatabaseWorkouts } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { setFavorites } from "../redux/favoritesSlice";
import Button from "../components/ui/Button";

const AllWorkoutsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const workouts = useSelector(allWorkouts);

  // Get all workouts + favorites from Firebase Database and save them to Redux
  useEffect(() => {
    async function getWorkout() {
      setIsLoading(true);
      try {
        const fetchedWorkouts = await fetchDatabaseWorkouts(currentUser.uid);
        const fetchedFavWorkouts = await fetchDatabaseFavorites(
          currentUser.uid
        );
        dispatch(setWorkouts(fetchedWorkouts));
        dispatch(setFavorites(fetchedFavWorkouts));
        setIsLoading(false);
      } catch (error) {
        setErr(true);
      }
      setIsLoading(false);
    }
    getWorkout();
  }, []);

  //Loading Screen
  if (isLoading) {
    return <LoadingOverlay message="Getting Workouts..." />;
  }

  return (
    <View>
      <Header logout={true}>All Workouts</Header>
      <WorkoutList workouts={workouts} />
      {!workouts && (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>You don't have any workouts yet!</Text>
          <Button onPress={() => navigation.navigate("AddWorkout")}>
            Add New Workout
          </Button>
        </View>
      )}
    </View>
  );
};

export default AllWorkoutsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
});
