import LocationListingCard from "@/components/locations/loc-listing-card";
import FavoritesHeader from "./favorites-header";
import { selectUserSavedLocs } from "@/slices/userSavedLocsSlice";
import { useSelector } from "react-redux";

const UserFavoritesPage = () => {
  const userSavedLocs = useSelector(selectUserSavedLocs);

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
