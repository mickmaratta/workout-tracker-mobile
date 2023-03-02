import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '../components/ui/Header';
import { useSelector } from 'react-redux';
import WorkoutList from '../components/Workouts/WorkoutList';

const FavoriteWorkoutsScreen = () => {
  const favWorkoutIds = useSelector(state => state.favorites.favorites);
  const workouts = useSelector((state) => state.workouts.workouts);
  const [favorites, setFavorites] = useState([]);

  //Filter all workouts to get an array of Favorites
  useEffect(() => {
    setFavorites(workouts?.filter((workout) => favWorkoutIds.includes(workout._id)))
  }, []);

  return (
    <View style={styles.container}>
      <Header>Favorites</Header>
      <WorkoutList workouts={favorites} />
      {!favorites && <Text>You don't have any favorites yet</Text>}
    </View>
  )
}

export default FavoriteWorkoutsScreen

const styles = StyleSheet.create({})