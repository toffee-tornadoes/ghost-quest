import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import LocationListingCard from "@/components/locations/loc-listing-card";

//     const fetchLocationIds = async () => {
//   // console.log(id)
//     let { data}  = await supabase.from('user_locations').select('location_id')
//       .eq('profile_id', `a2b03fab-3a8a-41fa-bf72-dd43f999d015`);

//   return data;
// }

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data } = await supabase
    .from("user_locations")
    .select("*,locations(*)")
    .eq("profile_id", id)
    .eq("is_favorited", true);

  return {
    props: {
      data,
    },
  };
};

// ghostquest.com/user/[id]/favorites
const UserFavoritesPage = ({ data }) => {
  const user = useUser();
  console.log(data);

  //     useEffect(() => {
  //   fetchLocationIds().then((result) => {
  //     console.log(result);
  //   })
  // }, []);

  if (data.length > 0) {
    return (
      <div>
        <LocationListingCard locations={[data[0].locations]} />
      </div>
    );
  } else {
    return <p>No Favorited Locations</p>;
  }
};

export default UserFavoritesPage;
