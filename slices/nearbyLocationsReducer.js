import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = [];

// export const findNearby = createAsyncThunk(
//   "getNearbyLocations",
//   async (locations) => {
//     console.log(locations);
//     return locations;
//   }
// );

const nearbyLocationsSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    findNearby: (state, action) => {
      console.log(action);
      state = action.payload;
      return state;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(findNearby.fulfilled, (state, action) => {
  //     state = action.payload;
  //   });
  // },
});

export const { findNearby } = nearbyLocationsSlice.actions;
export const selectNearbyLocations = (state) => state.nearbyLocations;
export default nearbyLocationsSlice.reducer;
