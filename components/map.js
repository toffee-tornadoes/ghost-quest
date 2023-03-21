import { useCallback, useMemo, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

//display multiple markers by using forEach method or mapping through the array
// coords.forEach((cord) => console.log(Object.values(cord)[0]));

const Map = ({ locations }) => {
  const mapRef = useRef();
  //set center to user's current location (based on geocoordinates)
  //   const center = useMemo(
  //     () => ({
  //       lat: locations[0].city_latitude,
  //       lng: locations[0].city_longitude,
  //     }),
  //     []
  //   );
  const center = useMemo(() => ({ lat: 40, lng: -80 }));
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "44716b655554d0c5",
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (

      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          mapContainerStyle={{
            height: "100vh",
            width: "100vw",
            // opacity: .5,
          }}
        >
          {/* {locations.slice(0, 10).map((location) => {
            return (
              <MarkerF
                position={{
                  lat: location.city_latitude,
                  lng: location.city_longitude,
                }}
              ></MarkerF>
            );
          })} */}
        </GoogleMap>
      </div>

  );
};

export default Map;
