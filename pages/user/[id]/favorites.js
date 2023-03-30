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
      <div>
        <div className="text-lg">
          <FavoritesHeader />
          <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
            <p className="justify-">No Favorited Locations</p>
          </div>
        </div>
      </div>
    );
  }
};

export default UserFavoritesPage;
