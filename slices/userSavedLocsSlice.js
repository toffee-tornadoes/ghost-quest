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
  async ({ userId, state, locationId }) => {
    const { data, error } = await supabase
      .from("user_locations")
      .update({ has_visited: state ? false : true })
      .eq("location_id", locationId)
      .eq("profile_id", userId)
      .select();
    return data;
  }
);

export const addVisitedLoc = createAsyncThunk(
  "addVisitedLoc",
  async ({ userId, locationId }) => {
    const { data, error } = await supabase
      .from("user_locations")
      .upsert(
        { location_id: locationId, profile_id: userId, has_visited: true },
      )
      .select()
    return data[0];
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
    builder.addCase(addVisitedLoc.fulfilled, (state, action) => {
      state.push(action.payload);
      return state;
    });
    builder.addCase(setVisitedLocs.fulfilled, (state, action) => {
      state.forEach((object) => {
        if (object?.location_id === action.payload[0].location_id) {
          const idx = state.indexOf(object);
          state.splice(idx, 1);
          state.push(action.payload[0]);
        }
      });
      return state
    });
  },
});

export const { resetUserSavedLocs } = userSavedLocsSlice.actions;
export const selectUserSavedLocs = (state) => state?.userSavedLocs || "";
export default userSavedLocsSlice.reducer;
