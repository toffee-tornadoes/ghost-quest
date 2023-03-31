import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

// export const fetchFavs = createAsyncThunk('fetchFavs', async(userId) => {

// })

const userFavoritesSlice = createSlice({
  name: "userFavoritedLocs",
  initialState,
  reducers: {
    fetchFavs: (state, action) => {
      return state;
    },
    findFavs: (state, action) => {
      const favLocs = [];
      for (let i = 0; i < action.payload?.length; i++) {
        if (action.payload[i]?.is_favorited === true) {
          favLocs.push(action.payload[i]?.locations);
        }
      }
      state = favLocs;
      return state;
    },
  },
});

export const { fetchFavs, findFavs } = userFavoritesSlice.actions;
export const selectUserFavorites = (state) => state.userFavoritedLocs;
export default userFavoritesSlice.reducer;
