import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
  },
  reducers: {
    //SET FAVORITES
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    //ADD FAVORITE
    addReduxFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },

    //DELETE FAVORITE
    deleteReduxFavorite: (state, action) => {
      state.favorites = state.favorites.filter(favId => favId !== action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFavorites,
  addReduxFavorite,
  deleteReduxFavorite,
} = favoritesSlice.actions;
export const allFavWorkouts = (state) => state.favorites.favorites;
export default favoritesSlice.reducer;
