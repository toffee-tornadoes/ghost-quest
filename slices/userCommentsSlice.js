import { supabase } from "@/lib/supabaseClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchUserComments = createAsyncThunk(
  "fetchUserComments",
  async (userId) => {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(*), locations(*)")
      .eq("profile_id", userId);
    return data;
  }
);

const userCommentsSlice = createSlice({
  name: "userComments",
  initialState,
  reducers: {
    resetUserComments: (state, action) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserComments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { resetUserComments } = userCommentsSlice.actions;
export const selectUserComments = (state) => state.userComments;
export default userCommentsSlice.reducer;
