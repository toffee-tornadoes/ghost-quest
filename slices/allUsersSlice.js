import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = [];

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const { data } = await supabase.from("profiles").select("*");
  return data;
});

const fetchAllUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {

      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.allUsers;
export default fetchAllUsersSlice.reducer;
