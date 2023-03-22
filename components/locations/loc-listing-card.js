// Simple component that displays location name, distance, icon/image, etc.
import Link from "next/link";
import FavoriteIcon from "../icons/favorite-icon";

const LocationListingCard = ({ locations }) => {

  return (
    <div>
      <div className="text-lg">
        <h1 className="ml-2 mr-2 mb-4 text-lg text-orange-700 sticky text-left border-orange-700 border-b">Haunts within 20 miles:</h1>
        {locations.map((location) => {
          return (
            <>
              <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
                <Link className="w-full text-base text-left text-slate-500 hover:text-purple-400" key={location.id} href={`/locations/${location.id}`}>
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default LocationListingCard;
