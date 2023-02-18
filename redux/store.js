import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from "./workoutsSlice";
import favoritesReducer from "./favoritesSlice";
import completedWorkoutsReducer from "./completedWorkoutsSlice";

export default configureStore({
  reducer: {
    workouts: workoutsReducer,
    favorites: favoritesReducer,
    completedWorkouts: completedWorkoutsReducer,
  }
})