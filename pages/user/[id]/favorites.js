import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import LocationListingCard from "@/components/locations/loc-listing-card";
import BackIcon from "@/components/icons/back-icon";

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
        <div className="p-2">
          <BackIcon />
        </div>
        <LocationListingCard locations={[data[0].locations]} />
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
            <h1 className="w-full">Favorited Locations</h1>
            <div className="text-slate-500 italic text-base">
              <h1></h1>
            </div>
          </div>
          <div className="p-2">
            <BackIcon />
          </div>
        </div>
        <div>
          <p className="justify-">No Favorited Locations</p>
        </div>
      </>
    );
  }
};

export default UserFavoritesPage;
