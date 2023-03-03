import { createSlice } from "@reduxjs/toolkit";

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
      state.workouts = action.payload;
    },

    //ADD WORKOUT
    addWorkoutsSuccess: (state, action) => {
      state.isFetching = false;
      state.workouts = [...state.workouts, action.payload];
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
      state.isFetching = false;
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload._id
      );
    },
  },
});

export const {
  setWorkouts,
  addWorkoutsSuccess,
  updateWorkoutSuccess,
  deleteWorkoutSuccess,
  completeWorkoutSuccess,
} = workoutsSlice.actions;

export const allWorkouts = (state) => state.workouts.workouts;
export default workoutsSlice.reducer;
