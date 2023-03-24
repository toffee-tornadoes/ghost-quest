// Google Maps component lives here
// Basic Nav modal
// User Profile Icon - link to profile page
// Search Icon - link to search page

import { useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Header from "./header";
import NavIcon from "./icons/nav-icon";
import Map from "./map";
import { useSelector, useDispatch } from "react-redux";
import { selectLocations, fetchLocations } from "@/slices/locationsSlice";
import {
  selectUserLocation,
  fetchUserLocation,
} from "@/slices/userLocationSlice";
import { fetchNearbyLocations } from "@/slices/nearbyLocationsSlice";

const Layout = ({ children }) => {
  const [navUp, setNavUp] = useState(false);
  const [height, setHeight] = useState("h-36");
  const [hidden, setHidden] = useState("hidden");
  const locations = useSelector(selectLocations);
  const userLocation = useSelector(selectUserLocation);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (!navUp) {
      setNavUp(!navUp);
      setHeight("h-4/5");
      setHidden("");
    } else {
      setNavUp(!navUp);
      setHeight("h-36");
      setHidden("hidden");
    }
  };

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    dispatch(fetchUserLocation());
  }, [locations]);

  useEffect(() => {
    dispatch(fetchNearbyLocations({ locations, userLocation }));
  }, [locations]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  //we should definitely set up a spinner to display instead of this string
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Header navUp={navUp} clickHandler={clickHandler} />
      <Map navUp={navUp} clickHandler={clickHandler} />
      <div
        id="layoutDiv"
        className={`flex-col z-1 items-center overflow-auto transition-height duration-300 ease-in-out rounded-t-2xl ${height} pt-4 w-full gap-y-10 text-center text-white flex fixed bg-black bg-opacity-60 backdrop-blur-lg bottom-0`}
      >
        <div
          onClick={clickHandler}
          className="flex cursor-pointer hover:scale-110 justify-center fixed"
        >
          <NavIcon />
        </div>
        <div
          className={`${hidden} pt-10 h-full justify-between w-full p-3 flex flex-col`}
          id="pageContainer"
        >
          {children}
          {/* <div className="pb-5">
            <NavButton />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
