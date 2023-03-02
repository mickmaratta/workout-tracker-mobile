import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useEffect } from "react";
import WorkoutList from '../components/Workouts/WorkoutList'
import { useDispatch, useSelector } from "react-redux";
import { DUMMY_DATA} from "../models/workout";
import {workoutStart, workoutFailure, getWorkoutsSuccess } from "../redux/workoutsSlice";
import Header from '../components/ui/Header';
 
const AllWorkoutsScreen = () => {
const dispatch = useDispatch();
const workouts = useSelector((state) => state.workouts.workouts)

// Get all workouts from Firebase Database and save them to Redux
  useEffect(() => {
    dispatch(workoutStart());
    try {
      dispatch(getWorkoutsSuccess())
    } catch (error) {
      dispatch(workoutFailure)
    }
  }, [])
  
  return (
    <View>
      <Header>All Workouts</Header>
      <WorkoutList workouts={workouts} />
    </View>
  )
}

export default AllWorkoutsScreen

const styles = StyleSheet.create({})