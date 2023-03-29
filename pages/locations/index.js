import LocationListingCard from "@/components/locations/loc-listing-card";
import AllLocationHeader from "@/components/locations/locations-header";
import { useSelector } from "react-redux";
import { selectNearbyLocations } from "@/slices/nearbyLocationsSlice";

const Locations = () => {
  const nearbyLocations = useSelector(selectNearbyLocations);

  return (
    <div>
      <AllLocationHeader />
      <LocationListingCard locations={nearbyLocations} />
    </div>
  );
};

export default Locations;
