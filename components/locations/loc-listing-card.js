// Simple component that displays location name, distance, icon/image, etc.
import Link from "next/link";
import { Fragment } from "react";
import FavoriteIcon from "../icons/favorite-icon";

const LocationListingCard = ({ locations }) => {

  return (
    <div>
      <div className="text-lg">
        {locations.map((location) => {
          return (
            <Fragment key={location.id}>
              <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
                <Link className="w-full text-base text-left text-slate-500 hover:text-purple-400" href={`/locations/${location.id}`}>
                  <h2 className="flex">
                    {`"${location.location}"\u00A0`}
                    {" "}
                    <div id="cityState" className="italic text-slate-400">
                    {location.city}
                    {", "}
                    {location.state}
                    </div>
                  </h2>
                </Link>
                <button>
                  <FavoriteIcon />
                </button>
              </div>
            </ Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LocationListingCard;
