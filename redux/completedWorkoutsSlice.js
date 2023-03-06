import { createSlice } from "@reduxjs/toolkit";

export const completedWorkoutsSlice = createSlice({
  name: "completedWorkouts",
  initialState: {
    completedWorkouts: [],
  },
  reducers: {  
    //COMPLETE WORKOUT
    completeReduxWorkout: (state, action) => {
      state.isFetching = false;
      state.completedWorkouts = [...state.completedWorkouts, action.payload];
    },
  },
});

export const {
  completeReduxWorkout,
} = completedWorkoutsSlice.actions;

export default completedWorkoutsSlice.reducer;
