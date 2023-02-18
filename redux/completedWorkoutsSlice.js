import { createSlice } from "@reduxjs/toolkit";

export const completedWorkoutsSlice = createSlice({
  name: "completedWorkouts",
  initialState: {
    completedWorkouts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    
    //COMPLETE WORKOUT
    completeWorkoutSuccess: (state, action) => {
      state.isFetching = false;
      state.completedWorkouts = [...state.completedWorkouts, action.payload];
    },
  },
});

export const {
  workoutStart,
  workoutFailure,
  getWorkoutsSuccess,
  addWorkoutsSuccess,
  updateWorkoutSuccess,
  deleteWorkoutSuccess,
  completeWorkoutSuccess,
} = completedWorkoutsSlice.actions;

export default completedWorkoutsSlice.reducer;
