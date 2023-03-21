// Google Maps component lives here
// Basic Nav modal
// User Profile Icon - link to profile page
// Search Icon - link to search page

import { supabase } from "@/lib/supabaseClient";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import Map from "./map";
import Nav from "./nav";
import NavButton from "./nav-button";

// fetch haunted house locations from supabase
export const getServerSideProps = async () => {
  const { data } = await supabase.from("locations").select();
  return {
    props: {
      locations: data,
    },
  };
};

const Layout = ({ children, locations }) => {
  const [navUp, setNavUp] = useState(false);
  const [display, setDisplay] = useState(false);

  let height = "h-36";
  let hidden = "hidden";

  const clickHandler = () => {
    setNavUp(!navUp);
    setDisplay(!display);
  };

  if (navUp && display) {
    height = "h-1/2 max-h-full";
    hidden = "";
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map locations={locations} />
      <div
        id="layoutDiv"
        className={`flex-col z-1 transition-height duration-300 ease-in-out rounded-t-2xl ${height} pt-4 w-full gap-y-10 text-center text-white flex absolute bg-black bottom-0`}
      >
        <button onClick={clickHandler} className="hover:text-slate-300">
          Swipe Up
        </button>
        <div className={`${hidden}`} id="pageContainer">
          {children}
        </div>
        <NavButton />
      </div>
    </>
  );
};

export default Layout;
