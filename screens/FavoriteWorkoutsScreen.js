import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '../components/ui/Header';
import { useSelector } from 'react-redux';
import WorkoutList from '../components/Workouts/WorkoutList';
import { allWorkouts } from '../redux/workoutsSlice';
import { favWorkouts } from '../redux/favoritesSlice';

const FavoriteWorkoutsScreen = () => {
  const favWorkoutIds = useSelector(favWorkouts);
  const workouts = useSelector(allWorkouts);
  const [favorites, setFavorites] = useState([]);

  //Filter all workouts to get an array of Favorites
  useEffect(() => {
    setFavorites(workouts?.filter((workout) => favWorkoutIds.includes(workout._id)))
  }, []);

  return (
    <View style={styles.container}>
      <Header>Favorites</Header>
      <WorkoutList workouts={favorites} />
      {favorites.length === 0 && <Text>You don't have any favorites yet</Text>}
    </View>
  )
}

export default FavoriteWorkoutsScreen

const styles = StyleSheet.create({})