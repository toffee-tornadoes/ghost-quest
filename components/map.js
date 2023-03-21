import { useState, useCallback, useMemo, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

//display multiple markers by using forEach method or mapping through the array
// coords.forEach((cord) => console.log(Object.values(cord)[0]));

const Map = ({ locations }) => {
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  //geolocation
  if ("geolocation" in navigator) {
    console.log("geolocation available!");
  } else {
    console.log("geolocation is NOT available");
  }

  //map parameters
  const center = useMemo(() => ({ lat: 40, lng: -80 }));
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "44716b655554d0c5",
    }),
    []
  );

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
        {locations.slice(0, 20).map((location) => {
          return (
            <MarkerF
              key={location.id}
              position={{
                lat: location.city_latitude,
                lng: location.city_longitude,
              }}
            ></MarkerF>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Map;
