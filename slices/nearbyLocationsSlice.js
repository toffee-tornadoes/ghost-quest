import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

//create functions for limited amount of markers here and save returned array to local state that can be passed as a prop to other parts of the app
//getNearbyLocations function that then sets local state

//check to see if a given marker is within the bounds of given circle's radius
const checkDistance = (marker, circle, radius) => {
  var km = radius / 1000;
  var kx = Math.cos((Math.PI * circle.lat) / 180) * 111;
  var dx = Math.abs(circle.lng - marker.lng) * kx;
  var dy = Math.abs(circle.lat - marker.lat) * 111;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

//THE ISSUE IS PROBABLY HERE SOMEWHERE!!!
const getNearbyLocations = async (locations, userLocation) => {
  const nearby = [];
  locations.map((location) => {
    const position = {
      lat: location.city_latitude,
      lng: location.city_longitude,
    };
    const inBounds = checkDistance(position, userLocation, 15000);
    if (inBounds) {
      nearby.push(location);
    }
  });
  return nearby;
};

export const fetchNearbyLocations = createAsyncThunk(
  "fetchNearbyLocations",
  async ({ locations, userLocation }) => {
    const nearbyLocations = await getNearbyLocations(locations, userLocation);
    return nearbyLocations;
  }
);

const nearbyLocationsSlice = createSlice({
  name: "nearbyLocations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNearbyLocations.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectNearbyLocations = (state) => state.nearbyLocations;
export default nearbyLocationsSlice.reducer;
