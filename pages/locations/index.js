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

const Locations = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const userLocation = useSelector(selectUserLocation);
  const nearbyLocations = useSelector(selectNearbyLocations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    dispatch(fetchUserLocation());
  }, [locations]);

  useEffect(() => {
    dispatch(fetchNearbyLocations({ locations, userLocation }));
  }, [locations]);

  return (
    <div>
      <AllLocationHeader />
      <LocationListingCard locations={nearbyLocations} />
    </div>
  );
};

export default Locations;
