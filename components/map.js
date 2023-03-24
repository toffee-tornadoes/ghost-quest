import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  GoogleMap,
  MarkerF,
  Circle,
  MarkerClustererF,
  MarkerClusterer,
  InfoWindowF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNearbyLocations,
  findNearby,
  selectLocations,
  fetchLocations,
} from "@/slices/locationsSlice";
import Locations from "@/pages/locations";

const Map = ({ clickHandler, navUp }) => {
  //Testing redux
  const locs = useSelector(selectLocations);
  const dispatch = useDispatch();
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [userLocation, setUserLocation] = useState({});
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(google.maps.DirectionsResult);
  const [travelMode, setTravelMode] = useState(google.maps.TravelMode.DRIVING);

  // useEffect(() => {
  //   dispatch(fetchLocations()).then((result) => setLocations(result.payload));
  // }, []);

  // useEffect(() => {
  //   getNearbyLocations().then((result) => {
  //     setNearbyLocations(result);
  //   });
  // }, []);

  //map parameters
  // const center = useMemo(() => ({ lat: 40, lng: -80 }), []);
  //default to default location if user opts out of location services
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

  const fetchDirections = async (selectedLocation) => {
    if (!selectedLocation) return;

    const service = new google.maps.DirectionsService();

    const origin = await getLocation();

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: `${selectedLocation.latitude}, ${selectedLocation.longitude}`,
      },
      (results, status) => {
        if (status === "OK") {
          const destination = results[0].geometry.location;
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
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
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
          {nearbyLocations.map((location) => {
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
                onClick={() => {
                  setSelectedLocation(location);
                }}
              ></MarkerF>
            );
          })}
          {selectedLocation && (
            <InfoWindowF
              position={{
                lat: selectedLocation.city_latitude,
                lng: selectedLocation.city_longitude,
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
                <Link
                  onClick={!navUp && clickHandler}
                  className="text-lg hover:text-purple-600 text-slate-600 italic"
                  href={`/locations/${selectedLocation.id}`}
                >
                  See More Info
                </Link>
                <div>
                  <button
                    onClick={() =>
                      setTravelMode(google.maps.TravelMode.DRIVING)
                    }
                  >
                    Driving
                  </button>
                  <button
                    onClick={() =>
                      setTravelMode(google.maps.TravelMode.WALKING)
                    }
                  >
                    Walking
                  </button>
                  <button
                    onClick={() =>
                      setTravelMode(google.maps.TravelMode.BICYCLING)
                    }
                  >
                    Bicycling
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      fetchDirections(selectedLocation);
                    }}
                  >
                    Let's Hunt
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
