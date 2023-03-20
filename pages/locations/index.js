// list of all locations within a pre-determined radius from user current location
// each location is listing component
// each listing links to single location page/component

import LocationListingCard from "@/components/locations/loc-listing-card";
import AllLocationHeader from "@/components/locations/locations-header";

const Locations = () => {
  return (
    <div>
      <AllLocationHeader />
      <LocationListingCard />
    </div>
  )
}

export default Locations;
