import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = [];

// export const fetchUserFavorites = createAsyncThunk(
//   "fetchUserFavorites",
//   async (userId) => {
//     const { data } = await supabase
//       .from("user_locations")
//       .select("*,locations(*)")
//       .eq("profile_id", userId)
//       .eq("is_favorited", true);
//     return data;
//   }
// );

const userFavoritesSlice = createSlice({
  name: "userFavoritedLocs",
  initialState,
  reducers: {
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
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUserFavorites.fulfilled, (state, action) => {
  //     const newState = [];
  //     action.payload.map((loc) => {
  //       newState.push(loc.locations);
  //     });
  //     return (state = newState);
  //   });
  // },
});

export const { findFavs } = userFavoritesSlice.actions;
export const selectUserFavorites = (state) => state.userFavoritedLocs;
export default userFavoritesSlice.reducer;
