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

const LocationHeader = ({ location, savedLocs }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const user = useUser();
  const userId = user?.id;
  const locationId = location?.id;
  const dispatch = useDispatch();
  const userLocs = useSelector(selectUserSavedLocs);

  useEffect(() => {
    dispatch(getUserSavedLocs(userId));
  }, [dispatch, userLocs]);

  // useEffect(() => {
  //   const current = userLocs.filter((obj) => {
  //     return obj.location_id == locationId;
  //   })
  //   console.log(current.has_visited);
  // }, []);

  const visitHandler = () => {
    const current = userLocs?.filter((obj) => {
      return obj?.location_id == locationId;
    });

    console.log(current.length)

    if(current?.length == 0 || current?.length == undefined) {
      console.log('no match! adding now...')
      dispatch(addVisitedLoc({ userId, locationId }));
    }

    if (current[0]?.has_visited === true) {
      setToggle(false)
      console.log(toggle)
      return dispatch(setVisitedLocs({ userId, toggle, locationId })).then(()=>setToggle(!toggle));
    }

    if (current[0]?.has_visited === false) {
      setToggle(true)
      console.log(toggle)
      return dispatch(setVisitedLocs({ userId, toggle, locationId })).then(()=>setToggle(!toggle));
    }

    return dispatch(getUserSavedLocs(userId));
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
      <div className="flex p-2">
        <FontAwesomeIcon
          className="text-2xl p-1 mr-2"
          icon={faHouseCircleCheck}
          style={{ color: "#27ca12" }}
        />
        <button onClick={visitHandler}>
          <FontAwesomeIcon
            className="text-2xl p-1 mr-2"
            icon={faHouse}
            style={{ color: "#8c8c8c" }}
          />
        </button>
        <BackIcon />
      </div>
    </div>
  );
};

export default LocationHeader;
