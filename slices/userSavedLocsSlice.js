import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = [];

export const getUserSavedLocs = createAsyncThunk(
  "getUserSavedLocs",
  async (userId) => {
    const { data } = await supabase
      .from("user_locations")
      .select("*,locations(*)")
      .eq("profile_id", userId);
    return data;
  }
);

export const setVisitedLocs = createAsyncThunk(
  "setVisitedLocs",
  async ({ userId, toggle, locationId }) => {
    const { data, error } = await supabase
      .from("user_locations")
      .update({ has_visited: toggle })
      .eq("location_id", locationId)
      .eq("profile_id", userId)
      .select();

    return data;
  }
);

const userSavedLocsSlice = createSlice({
  name: "userSavedLocs",
  initialState,
  reducers: {
    resetUserSavedLocs: (state, action) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserSavedLocs.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(setVisitedLocs.fulfilled, (state, action) => {
      state.forEach((object) => {
        if (object.location_id === action.payload[0].location_id) {
          const idx = state.indexOf(object);
          state.splice(idx, 1);
          state.push(action.payload[0]);
        }
      });
    });
  },
});

export const { resetUserSavedLocs } = userSavedLocsSlice.actions;
export const selectUserSavedLocs = (state) => state?.userSavedLocs || "";
export default userSavedLocsSlice.reducer;
