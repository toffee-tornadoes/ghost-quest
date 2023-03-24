import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import LocationListingCard from "@/components/locations/loc-listing-card";

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
  let favLocations=[];


  if (data.length > 0) {
    data.map((location)=>favLocations.push(location.locations))
    return (
      <div>
        <LocationListingCard locations={favLocations} />
      </div>
    );
  } else {
    return <p>No Favorited Locations</p>;
  }
};

export default UserFavoritesPage;
