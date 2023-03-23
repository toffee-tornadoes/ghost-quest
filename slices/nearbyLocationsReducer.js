import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = [];

export const getLocations = createAsyncThunk(
  "getNearbyLocations",
  async (locations) => {
    console.log(locations);
    return locations;
  }
);

const nearbyLocationsSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// export const { getNearbyLocations } = nearbyLocationsSlice.actions;
export const selectNearbyLocations = (state) => state.nearbyLocations;
export default nearbyLocationsSlice.reducer;
