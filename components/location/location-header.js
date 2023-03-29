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
  const [toggle, setToggle] = useState(false);
  const [visited, setHasVisited] = useState(false);
  console.log("visited state:", visited);
  const user = useUser();
  const userId = user?.id;
  const locationId = location?.id;
  const dispatch = useDispatch();
  const userLocs = useSelector(selectUserSavedLocs);

  useEffect(() => {
    dispatch(getUserSavedLocs(userId));

    const current = userLocs.filter((obj) => {
      return obj?.location_id == locationId;
    });
    // console.log(current);
    if (current?.length == 0 || current[0]?.has_visited == false) {
      return;
    } else if (current?.length >= 1 && current[0]?.has_visited === true) {
      return setHasVisited(true);
    }
    console.log("current:", current);
    console.log("visited:", visited);
  }, [dispatch, location, toggle]);

  // useEffect(() => {
  //   const current = userLocs.filter((obj) => {
  //     return obj?.location_id == locationId;
  //   })
  //   // console.log(current);
  //   if (current?.length == 0 || current?.has_visited == false) {
  //     setHasVisited(false)
  //   }

  //   if (current?.length >= 1 && current?.has_visited == true) {
  //     setHasVisited(true)
  //   }
  //   console.log("current:", current)
  //   console.log("visited:", visited)
  // }, [toggle]);

  const visitHandler = () => {
    const current = userLocs?.filter((obj) => {
      return obj?.location_id == locationId;
    });

    if (current?.length == 0 || current?.length == undefined) {
      console.log("no match! adding now...");
      dispatch(addVisitedLoc({ userId, locationId })).then(()=>{setToggle(true)});
    }

    if (current[0]?.has_visited === true) {
      setToggle(false);
      setHasVisited(false);
      // console.log(toggle)
      return dispatch(setVisitedLocs({ userId, toggle, locationId })).then(() =>
        setToggle(!toggle)
      ).then(()=>{setHasVisited(!visited)});
    }

    if (current[0]?.has_visited === false) {
      // setToggle(!toggle);
      setHasVisited(true);
      // console.log(toggle)
      return dispatch(setVisitedLocs({ userId, toggle, locationId })).then(() =>
        setToggle(!toggle)
      );
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
      <div className="p-2 flex flex-row">
        {visited ? (
          <button className="flex p-1" onClick={visitHandler}>
            <FontAwesomeIcon
              className="text-2xl mr-2"
              icon={faHouseCircleCheck}
              style={{ color: "#27ca12" }}
            />
          </button>
        ) : (
          <button className="flex p-1" onClick={visitHandler}>
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
