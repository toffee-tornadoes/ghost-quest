import LocationListingCard from "@/components/locations/loc-listing-card";
import FavoritesHeader from "./favorites-header";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import {
  getUserSavedLocs,
  selectUserSavedLocs,
} from "@/slices/userSavedLocsSlice";
import { useRouter } from "next/router";
import {
  getUserFaveLocs,
  selectUserVisitedLocs,
} from "@/slices/userVisitedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UserFavoritesPage = () => {
  const user = useSelector(selectUserProfile);
  const profile = useSelector(selectUserProfile);
  const router = useRouter();
  const dispatch = useDispatch();
  const userFavs = useSelector(selectUserVisitedLocs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserFaveLocs(router?.query.id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile(router?.query.id));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <FavoritesHeader isLoading={isLoading} profile={profile} />
        <div className="pt-2 text-slate-500">
          Loading your results...
          <br />
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl mt-3"
            spinPulse
          />
        </div>
      </div>
    );
  }

  if (userFavs?.length > 0) {
    return (
      <div>
        <FavoritesHeader isLoading={isLoading} profile={profile} />
        <LocationListingCard locations={userFavs} />
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-lg">
          <FavoritesHeader profile={profile} />
          <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
            <p className="justify-">No Favorited Locations</p>
          </div>
        </div>
      </div>
    );
  }
};

export default UserFavoritesPage;
