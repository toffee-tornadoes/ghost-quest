// ghostquest.com/user/[id]/visited
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LocationListingCard from "@/components/locations/loc-listing-card";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data } = await supabase
    .from("user_locations")
    .select("*,locations(*)")
    .eq("profile_id", id)
    .eq("has_visited", true);

  return {
    props: {
      data,
    },
  };
};

const UserPlacesVisitedPage = ({ data }) => {
    let visitedLocations = [];
  if (data.length > 0) {
    data.map((location) => visitedLocations.push(location.locations));
    return (
      <div>
        <LocationListingCard locations={visitedLocations} />
      </div>
    );
  } else {
    return <p>No Visited Locations</p>;
  }
};

export default UserPlacesVisitedPage;
