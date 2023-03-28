import { supabase } from "@/lib/supabaseClient";
import LocationListingCard from "@/components/locations/loc-listing-card";
import FavoritesHeader from "./favorites-header";
import {
  selectUserSavedLocs,
  getUserSavedLocs,
} from "@/slices/userSavedLocsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// export const getServerSideProps = async (context) => {
//   const { id } = context.params;
//   const { data } = await supabase
//     .from("user_locations")
//     .select("*,locations(*)")
//     .eq("profile_id", id)
//     .eq("is_favorited", true);

//   return {
//     props: {
//       data,
//     },
//   };
// };

// ghostquest.com/user/[id]/favorites
const UserFavoritesPage = () => {
  const userSavedLocs = useSelector(selectUserSavedLocs);
  // const [favs, setFavs] = useState([]);

  // useEffect(() => {
  //   const favLocs = findFavs();
  //   setFavs(favLocs);
  // }, [favs]);

  const findFavs = () => {
    const favLocs = [];
    for (let i = 0; i < userSavedLocs.length; i++) {
      if (userSavedLocs[i].is_favorited === true) {
        favLocs.push(userSavedLocs[i].locations);
      }
    }
    return favLocs;
  };

  if (userSavedLocs.length > 0) {
    return (
      <div>
        <FavoritesHeader />
        <LocationListingCard locations={findFavs()} />
      </div>
    );
  } else {
    return (
      <>
        <FavoritesHeader />
        <div>
          <p className="justify-">No Favorited Locations</p>
        </div>
      </>
    );
  }
};

export default UserFavoritesPage;
