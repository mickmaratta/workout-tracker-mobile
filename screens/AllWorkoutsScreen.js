import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from "react";
import { Colors } from '../constants/GlobalStyles'
import WorkoutList from '../components/Workouts/WorkoutList'
import { useDispatch, useSelector } from "react-redux";
import { DUMMY_DATA} from "../models/workout";
import {workoutStart, workoutFailure, getWorkoutsSuccess } from "../redux/workoutsSlice";
 
const AllWorkoutsScreen = () => {
const dispatch = useDispatch();
const workouts = useSelector((state) => state.workouts.workouts)

  useEffect(() => {
    dispatch(workoutStart());
    try {
      dispatch(getWorkoutsSuccess(DUMMY_DATA))
    } catch (error) {
      dispatch(workoutFailure)
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <WorkoutList workouts={workouts} />
    </View>
  )
}

export default AllWorkoutsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: Colors.neutral800,
    flex: 1,
  }
})