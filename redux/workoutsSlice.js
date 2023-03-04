import { createSlice } from "@reduxjs/toolkit";
import { sortWorkouts } from "../util/helpers";

export const workoutsSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
  },
  reducers: {
    //SET WORKOUTS
    setWorkouts: (state, action) => {
      const sortedWorkouts = sortWorkouts(action.payload, 'recent')
      state.workouts = sortedWorkouts;
    },

    //ADD WORKOUT
    addReduxWorkout: (state, action) => {
      state.workouts = [action.payload, ...state.workouts];
    },

    //UPDATE WORKOUT
    updateReduxWorkout: (state, action) => {
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      );
      state.workouts[index] = action.payload;
    },

    //DELETE WORKOUT
    deleteReduxWorkout: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload
      );
    },
  },
});

export const {
  setWorkouts,
  addReduxWorkout,
  updateReduxWorkout,
  deleteReduxWorkout,
  completeWorkoutSuccess,
} = workoutsSlice.actions;

export const allWorkouts = (state) => state.workouts.workouts;
export default workoutsSlice.reducer;
