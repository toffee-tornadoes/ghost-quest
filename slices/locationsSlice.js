import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = [];

export const fetchLocations = createAsyncThunk("fetchLocations", async () => {
  const { data } = await supabase.from("locations").select();
  return data;
});

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectLocations = (state) => state.locations;
export default locationsSlice.reducer;
