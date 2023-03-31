import LocationListingCard from "@/components/locations/loc-listing-card";
import FavoritesHeader from "./favorites-header";
import { useSelector, useDispatch } from "react-redux";
import { selectUserFavorites, fetchFavs } from "@/slices/userFavoritesSlice";
import { useEffect } from "react";

const UserFavoritesPage = () => {
  const dispatch = useDispatch();
  const userFavs = useSelector(selectUserFavorites);

  useEffect(() => {
    dispatch(fetchFavs());
  }, []);

  if (userFavs.length > 0) {
    return (
      <div>
        <FavoritesHeader />
        <LocationListingCard locations={userFavs} />
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
