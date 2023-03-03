import { createSlice } from "@reduxjs/toolkit";
import { sortWorkouts } from "../util/helpers";

export const workoutsSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //SET WORKOUTS
    setWorkouts: (state, action) => {
      const sortedWorkouts = sortWorkouts(action.payload, 'recent')
      state.workouts = sortedWorkouts;
    },

    //ADD WORKOUT
    addWorkoutSuccess: (state, action) => {
      state.workouts = [action.payload, ...state.workouts];
    },

    //UPDATE WORKOUT
    updateWorkoutSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      );
      state.workouts[index] = action.payload;
    },

    //DELETE WORKOUT
    deleteWorkoutSuccess: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload
      );
    },
  },
});

export const {
  setWorkouts,
  addWorkoutSuccess,
  updateWorkoutSuccess,
  deleteWorkoutSuccess,
  completeWorkoutSuccess,
} = workoutsSlice.actions;

export const allWorkouts = (state) => state.workouts.workouts;
export default workoutsSlice.reducer;
