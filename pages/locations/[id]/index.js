// // ghostquest.com/location/[id]
// This is the single location view

import CommentFooter from "@/components/location/comment-footer";
import LocationCard from "@/components/location/location-card";
import LocationHeader from "@/components/location/location-header";
import { supabase } from "@/lib/supabaseClient";

export const getStaticPaths = async () => {
  const { data: locations } = await supabase.from("locations").select("id");

  const paths = locations.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: location } = await supabase
    .from("locations")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      location,
    },
  };
};

const LocationPage = ({ location }) => {
  console.log(location)
  // the props being passed to LocationCard and CommentFooter may change
  return (
    <div>
      <LocationHeader location={location} />
      <hr />
      <LocationCard location={location} />
      <hr />
      <CommentFooter location={location} />
      <button className="my-5 bg-cyan-900">Let's Hunt!</button>
    </div>
  );
};

export default LocationPage;
