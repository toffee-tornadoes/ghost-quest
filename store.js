import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";
import userLocationReducer from "./slices/userLocationSlice";
import nearbyLocationsReducer from "./slices/nearbyLocationsSlice";
import userSavedLocsReducer from "./slices/userSavedLocsSlice";
import userCommentsReducer from "./slices/userCommentsSlice";
import userVisitedLocsReducer from "./slices/userVisitedSlice";
import userFavoritedLocsReducer from "./slices/userFavoritesSlice";
import allUserCommentsReducer from "./slices/allUserCommentsSlice";
import userProfileReducer from "./slices/userProfileSlice";

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    userLocation: userLocationReducer,
    nearbyLocations: nearbyLocationsReducer,
    userSavedLocs: userSavedLocsReducer,
    userComments: userCommentsReducer,
    userVisitedLocs: userVisitedLocsReducer,
    userFavoritedLocs: userFavoritedLocsReducer,
    allUserComments: allUserCommentsReducer,
    userProfile: userProfileReducer,
  },
});
