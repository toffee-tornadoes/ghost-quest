import LocationListingCard from "@/components/locations/loc-listing-card";
import AllLocationHeader from "@/components/locations/locations-header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLocations, fetchLocations } from "@/slices/locationsSlice";
import {
  selectUserLocation,
  fetchUserLocation,
} from "@/slices/userLocationSlice";
import {
  fetchNearbyLocations,
  selectNearbyLocations,
} from "@/slices/nearbyLocationsSlice";
import {
  getUserSavedLocs,
  selectUserSavedLocs,
} from "@/slices/userSavedLocsSlice";
import { useUser } from "@supabase/auth-helpers-react";

const Locations = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const userLocation = useSelector(selectUserLocation);
  const nearbyLocations = useSelector(selectNearbyLocations);
  const userSavedLocs = useSelector(selectUserSavedLocs);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    dispatch(fetchUserLocation());
  }, [locations]);

  useEffect(() => {
    dispatch(fetchNearbyLocations({ locations, userLocation }));
  }, [locations]);

  useEffect(() => {
    dispatch(getUserSavedLocs(user?.id));
  }, [locations]);

  return (
    <div>
      <AllLocationHeader />
      <LocationListingCard
        locations={nearbyLocations}
        userSavedLocs={userSavedLocs}
      />
    </div>
  );
};

export default Locations;
