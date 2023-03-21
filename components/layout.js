// Google Maps component lives here
// Basic Nav modal
// User Profile Icon - link to profile page
// Search Icon - link to search page

import { supabase } from "@/lib/supabaseClient";
import { useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import Map from "./map";
import Nav from "./nav";
import NavButton from "./nav-button";

const fetchData = async () => {
  const { data } = await supabase.from("locations").select();
  return data;
};

const Layout = ({ children }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      setLocations(result);
    });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Nav />
      {children}
      <Map locations={locations} />
      <NavButton />
    </>
  );
};

export default Layout;
