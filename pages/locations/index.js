// list of all locations within a pre-determined radius from user current location
// each location is listing component
// each listing links to single location page/component

import LocationListingCard from "@/components/locations/loc-listing-card";
import AllLocationHeader from "@/components/locations/locations-header";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

const fetchLocations = async () => {
  const { data } = await supabase.from("locations").select();
  return data;
};

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then((result) => {
      setLocations(result);
    });
  }, []);

  return (
    <div>
      <AllLocationHeader />
      <LocationListingCard locations={locations} />
    </div>
  );
};

export default Locations;
