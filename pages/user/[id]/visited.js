// ghostquest.com/user/[id]/visited
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LocationListingCard from "@/components/locations/loc-listing-card";
import BackIcon from "@/components/icons/back-icon";

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
    return (
      <>
        <div
          className="border-b-white border-b flex justify-between"
          id="favorites-header"
        >
          <div className="m-2 text-left text-3xl">
            <h1 className="w-full">Visited Locations</h1>
            <div className="text-slate-500 italic text-base">
              <h1></h1>
            </div>
          </div>
          <div className="p-2">
            <BackIcon />
          </div>
        </div>
        <div>
          <p>No Visited Locations</p>
        </div>
      </>
    );
  }
};

export default UserPlacesVisitedPage;
