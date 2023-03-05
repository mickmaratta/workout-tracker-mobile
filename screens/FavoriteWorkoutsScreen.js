import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import { useSelector } from "react-redux";
import WorkoutList from "../components/Workouts/WorkoutList";
import { allWorkouts } from "../redux/workoutsSlice";
import { allFavWorkouts } from "../redux/favoritesSlice";

const FavoriteWorkoutsScreen = () => {
  const favWorkoutIds = useSelector(allFavWorkouts);
  const workouts = useSelector(allWorkouts);
  const [favorites, setFavorites] = useState([]);

  //Filter all workouts to get an array of Favorites
  useEffect(() => {
    setFavorites(
      workouts?.filter((workout) => favWorkoutIds.includes(workout._id))
    );
  }, [favWorkoutIds]);

  return (
    <View style={styles.outerContainer}>
      <Header logout={true}>Favorites</Header>
      <WorkoutList workouts={favorites} />
      {favorites.length === 0 && (
        <View style={styles.innterContainer}>
          <Text style={styles.text}>You don't have any favorites yet</Text>
        </View>
      )}
    </View>
  );
};

export default FavoriteWorkoutsScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innterContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 180,
  },
});
