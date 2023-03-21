// Simple component that displays location name, distance, icon/image, etc.
const LocationListingCard = ({ locations }) => {
  return (
    <div>
      <div className="text-lg">
        {locations.map((location) => {
          return (
            <div key={location.id} className="flex flex-row justify-between">
              <h1 className="flex justify-between ">
                {location.location}
                {"      "}
                {location.city}
                {", "}
                {location.state}
              </h1>
              <button>Favorite</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationListingCard;
