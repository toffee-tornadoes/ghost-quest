import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { lat: 40.6928195, lng: -73.98218279999999 };

const getGeodata = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) =>
      resolve(position, (error) => reject(error))
    );
  });
};

const getLocation = async () => {
  let geolocationStatus = await navigator.permissions.query({
    name: "geolocation",
  });
  if ("geolocation" in navigator) {
    if (geolocationStatus.state === "granted") {
      console.log("geolocation available and location services allowed!");
      const position = await getGeodata();
      const userLocation = {
        lat: Number(position.coords.latitude),
        lng: Number(position.coords.longitude),
      };
      return userLocation;
    } else {
      console.log("location services blocked");
      return initialState;
    }
  } else {
    console.log("geolocation is not available");
  }
};

export const fetchUserLocation = createAsyncThunk(
  "fetchUserLocation",
  async () => {
    const userLocation = await getLocation();
    return userLocation;
  }
);

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserLocation.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUserLocation = (state) => state.userLocation;
export default userLocationSlice.reducer;
