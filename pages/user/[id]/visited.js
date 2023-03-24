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
  if (data.length > 0) {
    return (
      <div>
        <LocationListingCard locations={[data[0].locations]} />
      </div>
    );
  } else {
    return <p>No Visited Locations</p>;
  }
};

export default UserPlacesVisitedPage;
