import BackIcon from "../icons/back-icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck, faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  addVisitedLoc,
  getUserSavedLocs,
  selectUserSavedLocs,
  setVisitedLocs,
} from "@/slices/userSavedLocsSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserVisitedLocs,
  selectUserVisitedLocs,
} from "@/slices/userVisitedSlice";

const LocationHeader = ({ location, state }) => {
  const user = useUser();
  const userId = user?.id;
  const locationId = location?.id;
  const dispatch = useDispatch();
  const userLocs = useSelector(selectUserSavedLocs);
  const userVisitedLocs = useSelector(selectUserVisitedLocs);

  useEffect(() => {
    dispatch(getUserVisitedLocs(user?.id));
  }, [state, userLocs]);

  const visitHandler = () => {
    const current = userLocs?.filter((obj) => {
      return obj?.location_id == locationId;
    });

    // console.log("current length", current.length)
    if (current?.length === 0) {
      // console.log("no match! adding now...");
      dispatch(addVisitedLoc({ userId, locationId }))
    }

    if (state === false || state === true) {
      dispatch(setVisitedLocs({ userId, state, locationId }));
    }
  };

  return (
    <div className="flex justify-between" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <h1>{location.location}</h1>
        <div className="text-slate-500 italic text-base">
          <h1>
            {location.city}
            {", "}
            {location.state}
          </h1>
        </div>
      </div>
      <div className="p-2 flex flex-row">
        {state ? (
          <button className="flex p-1 hover:opacity-70" onClick={visitHandler}>
            <FontAwesomeIcon
              className="text-2xl mr-2"
              icon={faHouseCircleCheck}
              style={{ color: "#27ca12" }}
            />
          </button>
        ) : (
          <button
            className="flex p-1 opacity-50 hover:opacity-100"
            onClick={visitHandler}
          >
            <FontAwesomeIcon
              className="text-2xl mr-2"
              icon={faHouse}
              style={{ color: "#8c8c8c" }}
            />
          </button>
        )}
        <BackIcon />
      </div>
    </div>
  );
};

export default LocationHeader;
