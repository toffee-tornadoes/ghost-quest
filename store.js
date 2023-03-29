import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";
import userLocationReducer from "./slices/userLocationSlice";
import nearbyLocationsReducer from "./slices/nearbyLocationsSlice";
import userSavedLocsReducer from "./slices/userSavedLocsSlice";
import userCommentsReducer from "./slices/userCommentsSlice";
import userVisitedLocsReducer from "./slices/userVisitedSlice"

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    userLocation: userLocationReducer,
    nearbyLocations: nearbyLocationsReducer,
    userSavedLocs: userSavedLocsReducer,
    userComments: userCommentsReducer,
    userVisitedLocs: userVisitedLocsReducer,
  },
});
