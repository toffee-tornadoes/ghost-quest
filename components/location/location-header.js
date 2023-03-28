import BackIcon from "../icons/back-icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck, faHouse } from "@fortawesome/free-solid-svg-icons";
import { getUserSavedLocs, selectUserSavedLocs, setVisitedLocs } from "@/slices/userSavedLocsSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LocationHeader = ({ location, savedLocs }) => {
  const [toggle, setToggle] = useState(false);
  const user = useUser();
  const userId = user?.id;
  const locationId = location?.id;
  const dispatch = useDispatch();
  const userLocs = useSelector(selectUserSavedLocs)

  const visitHandler = () => {
    setToggle(!toggle);
    dispatch(setVisitedLocs({ userId, toggle, locationId }))
    dispatch(getUserSavedLocs(userId))
  };

  useEffect(()=>{
    dispatch(getUserSavedLocs(userId))
  }, [dispatch])

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
