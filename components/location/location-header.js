import BackIcon from "../icons/back-icon";

const LocationHeader = ({ location }) => {
  console.log(location);
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
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default LocationHeader;
