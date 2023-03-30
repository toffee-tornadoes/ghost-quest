import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

const initialState = [];

export const getUserSavedLocs = createAsyncThunk(
  "getUserSavedLocs",
  async (userId) => {
    const { data } = await supabase
      .from("user_locations")
      .select("*,locations(*)")
      .eq("profile_id", userId);
    return data;
  }
);

export const setVisitedLocs = createAsyncThunk(
  "setVisitedLocs",
  async ({ userId, state, locationId }) => {
    console.log("slice state:", state)
    const { data, error } = await supabase
      .from("user_locations")
      .update({ has_visited: state ? false : true })
      .eq("location_id", locationId)
      .eq("profile_id", userId)
      .select();
      // console.log("data:", data)
      // console.log("error:", error)
    return data;
  }
);

export const addVisitedLoc = createAsyncThunk(
  "addVisitedLoc",
  async ({ userId, locationId }) => {
    const { data, error } = await supabase
      .from("user_locations")
      .upsert([
        { location_id: locationId, profile_id: userId, has_visited: true },
      ])

    return data;
  }
);

const userSavedLocsSlice = createSlice({
  name: "userSavedLocs",
  initialState,
  reducers: {
    resetUserSavedLocs: (state, action) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserSavedLocs.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(addVisitedLoc.fulfilled, (state, action) => {
      state.push(action.payload)
    });
    builder.addCase(setVisitedLocs.fulfilled, (state, action) => {
      state.forEach((object) => {
        if (object?.location_id === action.payload[0].location_id) {
          const idx = state.indexOf(object)
          state.splice(idx, 1)
          state.push(action.payload[0])
        }
      });
      console.log(current(state))
      return state
    });
  },
});

// let visitedLocations = [...current(state)]
//       for (let i = 0; i < visitedLocations.length; i++) {
//         if (visitedLocations[i].id === action.payload[0].id) {
//           console.log(visitedLocations[i].has_visited)
//           visitedLocations[i].has_visited = action.payload[0].has_visited
//           break;
//         }
//       }
//       console.log(visitedLocations)
//       return visitedLocations

export const { resetUserSavedLocs } = userSavedLocsSlice.actions;
export const selectUserSavedLocs = (state) => state?.userSavedLocs || "";
export default userSavedLocsSlice.reducer;
