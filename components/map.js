import { useState, useCallback, useMemo, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  Circle,
  MarkerClustererF,
} from "@react-google-maps/api";

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
  const center = useMemo(() => ({ lat: 40, lng: -80 }), []);
  const myLocation = center;
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "44716b655554d0c5",
    }),
    []
  );

  //circle parameters
  const defaultOptions = {
    strokeOpactiy: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };

  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    strokeColor: "red",
    fillColor: "red",
    fillOpacity: 0.05,
  };

  const middleOptions = {
    ...defaultOptions,
    zIndex: 3,
    strokeColor: "maroon",
    fillColor: "maroon",
    fillOpacity: 0.05,
  };

  const farOptions = {
    ...defaultOptions,
    zIndex: 3,
    strokeColor: "grey",
    fillColor: "grey",
    fillOpacity: 0.05,
  };

  // const findNearbyLocations = ()

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
        <MarkerF
          position={myLocation}
          icon={"/home1.png"}
          animation={2}
        ></MarkerF>
        <Circle
          center={myLocation}
          radius={15000}
          options={closeOptions}
        ></Circle>
        <Circle
          center={myLocation}
          radius={30000}
          options={middleOptions}
        ></Circle>
        <Circle
          center={myLocation}
          radius={45000}
          options={farOptions}
        ></Circle>
        {locations.slice(0, 20).map((location) => {
          return (
            <MarkerF
              key={location.id}
              position={{
                lat: location.city_latitude,
                lng: location.city_longitude,
              }}
              icon={"/phantom.png"}
            ></MarkerF>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Map;
