// Simple component that displays location name, distance, icon/image, etc.
import Link from "next/link";

const LocationListingCard = ({ locations }) => {
  return (
    <div>
      <div className="text-lg">
        <h1>Nearby Haunts</h1>
        {locations.map((location) => {
          return (
            <Link key={location.id} href={`/locations/${location.id}`} className="flex flex-row justify-between">
              <h1 className="flex justify-between ">
                {location.location}
                {"      "}
                {location.city}
                {", "}
                {location.state}
              </h1>
              <button>Favorite</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LocationListingCard;
