import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useUser } from "@supabase/auth-helpers-react";

const initialState = {};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userInfoSlice.actions;
export const selectUser = (state) => state.userInfo;
export default userInfoSlice.reducer;
