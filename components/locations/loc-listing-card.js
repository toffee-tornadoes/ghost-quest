import Link from "next/link";
import { Fragment } from "react";
import FavoriteIcon from "../icons/favorite-icon";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserSavedLocs,
  getUserSavedLocs,
} from "@/slices/userSavedLocsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const LocationListingCard = ({ locations }) => {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const userSavedLocs = useSelector(selectUserSavedLocs);
  const [favStatus, setFavStatus] = useState(false);

  useEffect(() => {
    dispatch(getUserSavedLocs(router.query.id));
  }, [locations, favStatus, router]);

  const isFav = (locationId, userSavedLocs) => {
    let i = 0;
    while (i < userSavedLocs.length) {
      if (
        locationId === userSavedLocs[i].location_id &&
        userSavedLocs[i].is_favorited === true
      ) {
        return {
          color: "purple",
          status: true,
        };
      } else {
        i++;
      }
    }
    return {
      color: "none",
      status: false,
    };
  };

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
                  <>
                    <button>
                      <FavoriteIcon
                        locationId={location.id}
                        userId={user.id}
                        color={isFav(location.id, userSavedLocs)}
                        setFavStatus={setFavStatus}
                        favStatus={favStatus}
                      />
                    </button>
                  </>
                ) : null}
              </div>
            </Fragment>
          );
        })}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default LocationListingCard;
