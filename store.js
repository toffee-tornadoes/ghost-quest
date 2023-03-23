import { configureStore } from "@reduxjs/toolkit";
import nearbyLocationsReducer from "./slices/nearbyLocationsReducer";

export const store = configureStore({
  reducer: {
    nearbyLocations: nearbyLocationsReducer,
  },
});
