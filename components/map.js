import { useState, useCallback, useMemo, useRef, useEffect } from "react";
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
import { updateUserLocation } from "@/slices/userLocationSlice";
import { useDispatch } from "react-redux";

const Map = ({
  handleUserLocationChange,
  userLocation,
  nearbyLocations,
  clickHandler,
  navUp,
}) => {
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(google.maps.DirectionsResult);
  const [travelMode, setTravelMode] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [showDirections, setShowDirections] = useState(null);
  const dispatch = useDispatch();

  //map parameters
  //default to default location if user opts out of location services
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "44716b655554d0c5",
    }),
    []
  );

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
                  // setShowDirections(false);
                  setDirections(result);
                  // setShowDirections(true);
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
    // setShowDirections(false)
    // setTravelMode(null);
    setTravelMode(mode);
    fetchDirections(selectedLocation, mode);
  };

  const handleSelectLocation = async (location) => {
    // if (distance && duration) {
    //   setDistance(null);
    //   setDuration(null);
    // } else {
    //   // handleRemoveRoute()
    //   // setShowDirections(true)
    handleRemoveRoute();
    setShowDirections(false);
    setSelectedLocation(location);
    // }
  };
  // set selectedLocation null, new state T/F to show DirectionsRenderer
  // const handleRemoveRoute = () => {
  //   setShowDirections(false);
  //   setDistance(null);
  //   setDirections(null)
  //   setTravelMode(null)
  // };
  const handleRemoveRoute = () => {
    setTravelMode(null);
    setDistance(null);
    setDirections(null);
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
          {travelMode !== null ? (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "purple",
                },
              }}
            />
          ) : null}

          {/* set user's starting location (either the default or based on geodata) */}
          <MarkerF
            position={userLocation}
            icon={"/you-are-here-2.png"}
            animation={2}
            draggable={true}
            onDragEnd={handleUserLocationChange}
          />
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
          {nearbyLocations?.length > 0 && (
            <MarkerClustererF>
              {(clusterer) => {
                return nearbyLocations?.map((location) => {
                  const lat = Number(location.latitude);
                  const lng = Number(location.longitude);
                  return (
                    <MarkerF
                      key={location.id}
                      position={{
                        lat: lat,
                        lng: lng,
                      }}
                      icon={"/phantom.png"}
                      animation={2}
                      clusterer={clusterer}
                      onClick={() => {
                        handleSelectLocation(location);
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
                lat: Number(selectedLocation.latitude),
                lng: Number(selectedLocation.longitude),
              }}
              onCloseClick={() => {
                setSelectedLocation(null);
              }}
            >
              <div className="flex flex-col flex-wrap items-center">
                <h2 className="text-xl mt-2 mb-2">{selectedLocation.location}</h2>
                <img
                  className="border-black border border-solid h-36 w-36"
                  src="/haunted.png"
                  alt="Location picture"
                />
                {distance && duration && (
                  <div>
                    <p className="text-base font-medium ">Distance: {distance}</p>
                    <p className="text-base font-medium">Time: {duration}</p>
                  </div>
                )}
                <Link
                  onClick={!navUp && clickHandler}
                  className="flex text-lg justify-center hover:text-purple-600 text-slate-600 italic"
                  href={{
                    pathname: `/locations/${selectedLocation.id}`,
                    query: selectedLocation,
                  }}
                >
                  See More Info
                </Link>
                {showDirections ? (
                  <div className="flex justify-between text-center gap-3 text-lg underline text-orange-600">
                    <button
                    className="hover:text-orange-900"
                      onClick={() =>
                        handleTravelModeChange(google.maps.TravelMode.DRIVING)
                      }
                    >
                      Drive
                    </button>
                    <button
                    className="hover:text-orange-900"
                      onClick={() =>
                        handleTravelModeChange(google.maps.TravelMode.BICYCLING)
                      }
                    >
                      Bike
                    </button>
                    <button
                    className="hover:text-orange-900"
                      onClick={() =>
                        handleTravelModeChange(google.maps.TravelMode.WALKING)
                      }
                    >
                      Walk
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-base my-3 ">
                    <button className="hover:text-orange-500" onClick={() => setShowDirections(true)}>
                      Directions?
                    </button>
                  </div>
                )}
                {travelMode && (
                  <div className="text-center my-3">
                    <button
                      onClick={() => {
                        handleRemoveRoute();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
