import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  GoogleMap,
  MarkerF,
  Circle,
  MarkerClustererF,
  MarkerClusterer,
  InfoWindowF,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNearbyLocations,
  findNearby,
} from "@/slices/nearbyLocationsReducer";

const Map = ({ locations, clickHandler, navUp }) => {
  //Testing redux
  const testing = useSelector(selectNearbyLocations);
  const dispatch = useDispatch();

  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [userLocation, setUserLocation] = useState({});
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    getLocation().then((result) => setUserLocation(result));
  }, []);

  useEffect(() => {
    getNearbyLocations().then((result) => setNearbyLocations(result));
    dispatch(findNearby(nearbyLocations));
  }, [nearbyLocations]);

  //map parameters
  // const center = useMemo(() => ({ lat: 40, lng: -80 }), []);
  //default to default location if user opts out of location services
  const defaultLocation = { lat: 40.6928195, lng: -73.98218279999999 };
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
  const getGeodata = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) =>
        resolve(position, (error) => reject(error))
      );
    });
  };

  const getLocation = async () => {
    let geolocationStatus = await navigator.permissions.query({
      name: "geolocation",
    });
    if ("geolocation" in navigator) {
      if (geolocationStatus.state === "granted") {
        console.log("geolocation available and location services allowed!");
        const position = await getGeodata();
        const userLocation = {
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        };
        return userLocation;
      } else {
        console.log("location services blocked");
        return defaultLocation;
      }
    } else {
      console.log("geolocation is not available");
    }
  };

  //check to see if a given marker is within the bounds of given circle's radius
  const checkDistance = (marker, circle, radius) => {
    var km = radius / 1000;
    var kx = Math.cos((Math.PI * circle.lat) / 180) * 111;
    var dx = Math.abs(circle.lng - marker.lng) * kx;
    var dy = Math.abs(circle.lat - marker.lat) * 111;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  };

  //create functions for limited amount of markers here and save returned array to local state that can be passed as a prop to other parts of the app
  //getNearbyLocations function that then sets local state
  const getNearbyLocations = async () => {
    const nearby = [];
    locations.map((location) => {
      const position = {
        lat: location.city_latitude,
        lng: location.city_longitude,
      };
      const inBounds = checkDistance(position, userLocation, 15000);
      if (inBounds) {
        nearby.push(location);
      }
    });
    return nearby;
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
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
