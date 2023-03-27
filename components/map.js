import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  GoogleMap,
  MarkerF,
  Circle,
  MarkerClustererF,
  InfoWindowF,
  DirectionsRenderer,
  DistanceMatrixService,
} from "@react-google-maps/api";

const Map = ({
  locations,
  userLocation,
  nearbyLocations,
  clickHandler,
  navUp,
}) => {
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState(google.maps.TravelMode.DRIVING);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  console.log("locations: ", locations);
  console.log("user location: ", userLocation);
  console.log("nearby locations: ", nearbyLocations);

  //map parameters
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "44716b655554d0c5",
    }),
    []
  );

  //geolocation
  //check to see if user has allowed location services
  //if user has blocked location services, map should default to center location

  const calculateDistanceAndTime = (origin, destination, travelMode) => {
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: travelMode,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (status === "OK") {
          const element = response.rows[0].elements[0];
          setDistance(element.distance.text);
          setDuration(element.duration.text);
        } else {
          console.log("Error: ", status);
        }
      }
    );
  };

  const fetchDirections = async (selectedLocation, travelMode) => {
    if (!selectedLocation) return;

    const origin = userLocation;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: `${selectedLocation.latitude}, ${selectedLocation.longitude}`,
      },
      (results, status) => {
        if (status === "OK") {
          const destination = results[0].geometry.location;
          setDistance(null);
          setDuration(null);
          calculateDistanceAndTime(origin, destination, travelMode);
          if (
            typeof google !== "undefined" &&
            typeof google.maps.DirectionsService === "function"
          ) {
            const service = new google.maps.DirectionsService();
            service.route(
              {
                origin: origin,
                destination: destination,
                travelMode: travelMode,
              },
              (result, status) => {
                if (status === "OK" && result) {
                  setDirections(null);
                  setDirections(result);
                }
              }
            );
          }
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  const handleTravelModeChange = (mode) => {
    setTravelMode(mode);
    fetchDirections(selectedLocation, mode);
  };

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

  return (
    <>
      <div className="map">
        {/* <Locations nearbyLocations={nearbyLocations} /> */}
        <GoogleMap
          zoom={10}
          center={userLocation}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          mapContainerStyle={{
            height: "100vh",
            width: "100vw",
            // opacity: .5,
          }}
        >
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "purple",
              },
            }}
          />

          {/* set user's starting location (either the default or based on geodata) */}
          <MarkerF
            position={userLocation}
            icon={"/you-are-here-2.png"}
            animation={2}
          ></MarkerF>
          {/* <Circle
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
        ></Circle> */}
          {/* display multiple markers by using forEach method or mapping through
        the array */}
          {/* {locations.map((location) => {
          const position = {
            lat: location.city_latitude,
            lng: location.city_longitude,
          };
          const inBounds = checkDistance(position, userLocation, 45000);
          if (inBounds) {
            return (
              <MarkerF
                key={location.id}
                position={{
                  lat: location.city_latitude,
                  lng: location.city_longitude,
                }}
                icon={"/phantom.png"}
                animation={2}
                // clusterer={clusterer}
              ></MarkerF>
            );
          }
        })} */}
          {nearbyLocations?.length > 0 && (
            <MarkerClustererF>
              {(clusterer) => {
                return nearbyLocations?.map((location) => {
                  return (
                    <MarkerF
                      key={location.id}
                      position={{
                        lat: Number(location?.latitude),
                        lng: Number(location?.longitude),
                      }}
                      icon={"/phantom.png"}
                      animation={2}
                      clusterer={clusterer}
                      onClick={() => {
                        setSelectedLocation(location);
                      }}
                    ></MarkerF>
                  );
                });
              }}
            </MarkerClustererF>
          )}
          {selectedLocation && (
            <InfoWindowF
              position={{
                lat: Number(selectedLocation?.latitude),
                lng: Number(selectedLocation?.longitude),
              }}
              onCloseClick={() => {
                setSelectedLocation(null);
              }}
            >
              <div>
                <img
                  className="border-black border border-solid h-36 w-36"
                  src="/haunted.png"
                  alt="Location picture"
                />
                <h2 className="text-2xl">{selectedLocation.location}</h2>
                {distance && duration && (
                  <div>
                    <p>Distance: {distance}</p>
                    <p>Time: {duration}</p>
                  </div>
                )}
                <Link
                  onClick={!navUp && clickHandler}
                  className="text-lg hover:text-purple-600 text-slate-600 italic"
                  href={`/locations/${selectedLocation.id}`}
                >
                  See More Info
                </Link>
                <div className="flex justify-between my-2">
                  <button
                    onClick={() =>
                      handleTravelModeChange(google.maps.TravelMode.DRIVING)
                    }
                  >
                    Driving
                  </button>
                  <button
                    onClick={() =>
                      handleTravelModeChange(google.maps.TravelMode.BICYCLING)
                    }
                  >
                    Bicycling
                  </button>
                  <button
                    onClick={() =>
                      handleTravelModeChange(google.maps.TravelMode.WALKING)
                    }
                  >
                    Walking
                  </button>
                </div>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
