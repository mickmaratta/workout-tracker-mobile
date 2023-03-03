import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: ["e1"],
    isFetching: false,
    error: false,
  },
  reducers: {
    favoriteStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    favoriteFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL
    getFavoritesSuccess: (state, action) => {
      state.isFetching = false;
      state.favorites = action.payload;
    },

    //ADD FAVORITE
    addFavoriteSuccess: (state, action) => {
      state.isFetching = false;
      state.favorites = [...state.favorites, action.payload];
    },

    //REMOVE FAVORITE
    removeFavoriteSuccess: (state, action) => {
      state.isFetching = false;
      state.favorites = state.favorites.filter(favoriteWorkout => favoriteWorkout._id !== action.payload._id)
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  favoriteStart,
  favoriteFailure,
  getFavoritesSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
} = favoritesSlice.actions;
export const favWorkouts = (state) => state.favorites.favorites;
export default favoritesSlice.reducer;
