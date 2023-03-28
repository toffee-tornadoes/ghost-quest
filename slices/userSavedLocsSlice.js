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
  initialState: 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSavedLocs.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
    // builder.addCase(setVisitedLocs.fulfilled, (state, action) => {
    //   // console.log(action.payload[0].location_id)
    //   state.forEach((object) => {
    //     // console.log(object.location_id)
    //     // console.log(action.payload[0].location_id)
    //     (object.location_id === action.payload[0].location_id) &&
    //     state.push(action.payload[0])
    //   });
    // });
  },
});

export const selectUserSavedLocs = (state) => state?.userSavedLocs || "";
export default userSavedLocsSlice.reducer;
