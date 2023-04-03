import LocationListingCard from "@/components/locations/loc-listing-card";
import FavoritesHeader from "./favorites-header";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { selectUserSavedLocs } from "@/slices/userSavedLocsSlice";
import { useRouter } from "next/router";

const UserFavoritesPage = () => {
  // const user = useSelector(selectUserProfile);
  const profile = useSelector(selectUserProfile);
  const router = useRouter();
  const dispatch = useDispatch();
  const userSavedLocs = useSelector(selectUserSavedLocs);
  const [userFavs, setUserFavs] = useState();

  useEffect(() => {
    findFavs(userSavedLocs).then((result) => setUserFavs(result));
  }, []);

  useEffect(()=>{
    dispatch(fetchUserProfile(router?.query.id))
  }, [dispatch]);

  const findFavs = async (savedLocs) => {
    const favLocs = [];
    for (let i = 0; i < savedLocs?.length; i++) {
      if (savedLocs[i]?.is_favorited === true) {
        favLocs.push(savedLocs[i]?.locations);
      }
    }
    return favLocs;
  };

  if (userFavs?.length > 0) {
    return (
      <div>
        <FavoritesHeader profile={profile}/>
        <LocationListingCard locations={userFavs} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-lg">
          <FavoritesHeader profile={profile}/>
          <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
            <p className="justify-">No Favorited Locations</p>
          </div>
        </div>
      </div>
    );
  }
};

export default UserFavoritesPage;
