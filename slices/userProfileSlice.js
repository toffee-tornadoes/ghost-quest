import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = {};

export const fetchUserProfile = createAsyncThunk(
  "getUserProfile",
  async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
      // console.log("profile data:", data)
    return data;
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    resetUserProfile: (state, action) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { resetUserProfile } = userProfileSlice.actions;
export const selectUserProfile = (state) => state.userProfile;
export default userProfileSlice.reducer;
