import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = [];

export const getUserVisitedLocs = createAsyncThunk(
  "getUserVisitedLocs",
  async (userId) => {
    const { data } = await supabase
      .from("user_locations")
      .select("*,locations(*)")
      .eq("profile_id", userId)
      .eq("has_visited", true)
      // console.log(data)
    return data;
  }
);

const userVisitedLocs = createSlice({
  name: "userVisitedLocs",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUserVisitedLocs.fulfilled, (state, action) => {
      const newState = []
      action.payload.map((loc)=>{newState.push(loc.locations)})
      return state = newState
    });
  },
});

export const selectUserVisitedLocs = (state) => state.userVisitedLocs
export default userVisitedLocs.reducer;
