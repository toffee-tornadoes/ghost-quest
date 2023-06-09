import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./slices/locationsSlice";
import userLocationReducer from "./slices/userLocationSlice";
import nearbyLocationsReducer from "./slices/nearbyLocationsSlice";
import userSavedLocsReducer from "./slices/userSavedLocsSlice";
import userCommentsReducer from "./slices/userCommentsSlice";
import userVisitedLocsReducer from "./slices/userVisitedSlice";
import allUserCommentsReducer from "./slices/allUserCommentsSlice";
import userProfileReducer from "./slices/userProfileSlice";
import allUsersReducer from "./slices/allUsersSlice"

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    userLocation: userLocationReducer,
    nearbyLocations: nearbyLocationsReducer,
    userSavedLocs: userSavedLocsReducer,
    userComments: userCommentsReducer,
    userVisitedLocs: userVisitedLocsReducer,
    allUserComments: allUserCommentsReducer,
    userProfile: userProfileReducer,
    allUsers: allUsersReducer
  },
});
