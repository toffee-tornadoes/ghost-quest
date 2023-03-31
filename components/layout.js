import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Header from "./header";
import Map from "./map";
import { useSelector, useDispatch } from "react-redux";
import { selectLocations, fetchLocations } from "@/slices/locationsSlice";
import {
  selectUserLocation,
  fetchUserLocation,
  updateUserLocation,
} from "@/slices/userLocationSlice";
import {
  fetchNearbyLocations,
  selectNearbyLocations,
} from "@/slices/nearbyLocationsSlice";
import { useUser } from "@supabase/auth-helpers-react";
import {
  getUserSavedLocs,
  selectUserSavedLocs,
} from "@/slices/userSavedLocsSlice";
import { fetchUserComments } from "@/slices/userCommentsSlice";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";

const Layout = ({ children }) => {
  const user = useUser();
  const [navUp, setNavUp] = useState(false);
  const [height, setHeight] = useState("h-24");
  const [hidden, setHidden] = useState("hidden");
  const locations = useSelector(selectLocations);
  const userLocation = useSelector(selectUserLocation);
  const nearbyLocations = useSelector(selectNearbyLocations);
  const dispatch = useDispatch();
  const [arrow, setArrow] = useState(faChevronUp);
  const userProfile = useSelector(selectUserProfile);
  const userSavedLocs = useSelector(selectUserSavedLocs);

  const clickHandler = () => {
    if (!navUp) {
      setNavUp(!navUp);
      setArrow(faChevronDown);
      setHeight("h-4/5");
      setHidden("");
    } else {
      setNavUp(!navUp);
      setArrow(faChevronUp);
      setHeight("h-24");
      setHidden("hidden");
    }
  };

  const handleUserLocationChange = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(`New latitude: ${lat}, New longitude: ${lng}`);
    dispatch(updateUserLocation({ lat: lat, lng: lng }));
    dispatch(fetchNearbyLocations({ locations, userLocation }));
  };

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  useEffect(() => {
    dispatch(fetchUserLocation());
  }, [locations]);

  useEffect(() => {
    dispatch(fetchNearbyLocations({ locations, userLocation }));
  }, [locations, userLocation]);

  useEffect(() => {
    dispatch(getUserSavedLocs(user?.id));
  }, [locations]);

  useEffect(() => {
    dispatch(fetchUserComments(user?.id));
  }, [locations]);

  useEffect(() => {
    dispatch(fetchUserProfile(user?.id));
  }, [locations]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  //we should definitely set up a spinner to display instead of this string
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Header navUp={navUp} clickHandler={clickHandler} />
      <Map
        navUp={navUp}
        clickHandler={clickHandler}
        userLocation={userLocation}
        nearbyLocations={nearbyLocations}
        handleUserLocationChange={handleUserLocationChange}
      />
      <div
        id="layoutDiv"
        className={`flex-col z-1 items-center overflow-auto transition-height duration-300 ease-in-out rounded-t-2xl ${height} pt-4 w-full gap-y-10 text-center text-white flex fixed bg-black bg-opacity-60 backdrop-blur-lg bottom-0`}
      >
        <div
          onClick={clickHandler}
          className="flex cursor-pointer hover:scale-110 justify-center fixed"
        >
          <FontAwesomeIcon
            className="text-4xl"
            icon={arrow}
            fade
            style={{ color: "#968d8d" }}
          />
        </div>
        <div
          className={`${hidden} pt-10 h-full justify-between w-full p-3 flex flex-col`}
          id="pageContainer"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
