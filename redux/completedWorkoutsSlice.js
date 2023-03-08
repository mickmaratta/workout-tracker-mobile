import { createSlice } from "@reduxjs/toolkit";

export const completedWorkoutsSlice = createSlice({
  name: "completedWorkouts",
  initialState: {
    completedWorkouts: [],
  },
  reducers: {  
    //SET COMPLETED WORKOUTS
    setCompletedWorkouts: (state, action) => {
      state.completedWorkouts = action.payload
    },
    //COMPLETE WORKOUT
    completeReduxWorkout: (state, action) => {
      state.isFetching = false;
      state.completedWorkouts = [...state.completedWorkouts, action.payload];
    },
  },
});

export const {
  setCompletedWorkouts,
  completeReduxWorkout,
} = completedWorkoutsSlice.actions;

export const allCompletedWorkouts = (state) => state.completedWorkouts.completedWorkouts;
export default completedWorkoutsSlice.reducer;
