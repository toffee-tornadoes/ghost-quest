import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import LocationListingCard from "@/components/locations/loc-listing-card";
import BackIcon from "@/components/icons/back-icon";

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
  let favLocations = [];

  if (data.length > 0) {
    data.map((location) => favLocations.push(location.locations));
    return (
      <div>
        <div className="p-2">
          <BackIcon />
        </div>
        <LocationListingCard locations={favLocations} />
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
