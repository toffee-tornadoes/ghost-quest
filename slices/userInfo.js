import { supabase } from "@/lib/supabaseClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const fetchUser = createAsyncThunk('fetchUser', async() => {
    const { data } = await supabase.from()
})

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { getUser } = userInfoSlice.actions;
export const selectUserInfo = (state) => state.userInfo;
export default userInfoSlice.reducer;
