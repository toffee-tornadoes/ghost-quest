import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

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

const userSavedLocsSlice = createSlice({
  name: "userSavedLocs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSavedLocs.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const selectUserSavedLocs = (state) => state?.userSavedLocs || "";
export default userSavedLocsSlice.reducer;
