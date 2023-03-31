import { supabase } from "@/lib/supabaseClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchAllUserComments = createAsyncThunk(
  "fetchAllUserComments",
  async (locationId) => {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(*)")
      .eq("location_id", locationId);
    return data;
  }
);

const allUserCommentsSlice = createSlice({
  name: "userComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserComments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUserComments = (state) => state.allUserComments;
export default allUserCommentsSlice.reducer;
