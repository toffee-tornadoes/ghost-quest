// Simple component that displays location name, distance, icon/image, etc.
import Link from "next/link";
import { Fragment } from "react";
import FavoriteIcon from "../icons/favorite-icon";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserSavedLocs,
  getUserSavedLocs,
} from "@/slices/userSavedLocsSlice";

const LocationListingCard = ({ locations }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const userSavedLocs = useSelector(selectUserSavedLocs);
  const [favStatus, setFavStatus] = useState(false);
  const [color, setColor] = useState(false);

  // useEffect(() => {
  //   dispatch(getUserSavedLocs(user?.id));
  //   setColor(false);
  // }, [locations, favStatus, color]);

  const isFav = (locationId, userSavedLocs) => {
    //return a boolean that confirms whether a given location has been favorited by a user
    let i = 0;
    while (i < userSavedLocs.length) {
      if (
        locationId === userSavedLocs[i].location_id &&
        userSavedLocs[i].is_favorited === true
      ) {
        setColor(true);
        return "purple";
      } else {
        i++;
      }
    }
    setColor(true);
    return "none";
  };

  //fetch user favorites and check if any nearby locations are there, if they are, their fave icon should be filled

  return (
    <div>
      <div className="text-lg">
        {locations.map((location) => {
          return (
            <Fragment key={location.id}>
              <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
                <Link
                  className="w-full text-base text-left text-slate-500 hover:text-purple-400"
                  href={{
                    pathname: `/locations/${location.id}`,
                    query: location,
                  }}
                >
                  <h2 className="flex">
                    {`"${location.location}"\u00A0`}{" "}
                    <div
                      id="cityState"
                      className="italic text-slate-400 text-right pr-2"
                    >
                      {location.city}
                      {", "}
                      {location.state}
                    </div>
                  </h2>
                </Link>
                {user ? (
                  <button>
                    <FavoriteIcon
                      locationId={location.id}
                      userId={user.id}
                      color={() => isFav(location.id, userSavedLocs)}
                      setFavStatus={setFavStatus}
                      favStatus={favStatus}
                    />
                  </button>
                ) : null}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LocationListingCard;
