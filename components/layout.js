// Google Maps component lives here
// Basic Nav modal
// User Profile Icon - link to profile page
// Search Icon - link to search page

import { supabase } from "@/lib/supabaseClient";
import { useLoadScript } from "@react-google-maps/api";
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

const Layout = ({ locations }) => {
  console.log(locations);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Nav />
      <Map locations={locations} />
      <NavButton />
    </>
  );
};

export default Layout;
