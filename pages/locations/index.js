// list of all locations within a pre-determined radius from user current location
// each location is listing component
// each listing links to single location page/component

import LocationListingCard from "@/components/locations/loc-listing-card";
import AllLocationHeader from "@/components/locations/locations-header";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  findNearby,
  selectNearbyLocations,
} from "@/slices/nearbyLocationsReducer";

const fetchLocations = async () => {
  const { data } = await supabase.from("locations").select();
  return data;
};

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then((result) => {
      setLocations(result);
    });
  }, []);

  useEffect(() => {
    getLocation().then((result) => setUserLocation(result));
  }, []);

  useEffect(() => {
    getNearbyLocations().then((result) => {
      setNearbyLocations(result);
    });
  }, [nearbyLocations]);

  //default to default location if user opts out of location services
  const defaultLocation = { lat: 40.6928195, lng: -73.98218279999999 };

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

  return (
    <div>
      <AllLocationHeader />
      <LocationListingCard locations={nearbyLocations} />
    </div>
  );
};

export default Locations;
