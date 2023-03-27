import BackIcon from "../icons/back-icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCircleCheck, faHouse } from "@fortawesome/free-solid-svg-icons";

const LocationHeader = ({ location }) => {
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
        <FontAwesomeIcon className="text-2xl p-1 mr-2" icon={faHouseCircleCheck} style={{color: "#27ca12",}} />
        <FontAwesomeIcon className="text-2xl p-1 mr-2" icon={faHouse} style={{color: "#8c8c8c",}} />
        <BackIcon />
      </div>
    </div>
  );
};

export default LocationHeader;
