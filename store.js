import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";
import userLocationReducer from "./slices/userLocationSlice";
import nearbyLocationsReducer from "./slices/nearbyLocationsSlice";

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    userLocation: userLocationReducer,
    nearbyLocations: nearbyLocationsReducer,
  },
});
