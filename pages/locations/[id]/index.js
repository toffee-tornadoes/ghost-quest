// // ghostquest.com/location/[id]
// This is the single location view

import CommentFooter from "@/components/location/comment-footer";
import LocationCard from "@/components/location/location-card";
import LocationHeader from "@/components/location/location-header";
import { useRouter } from "next/router";
import {
  getUserSavedLocs,
  selectUserSavedLocs,
} from "@/slices/userSavedLocsSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/lib/supabaseClient";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data } = await supabase
    .from("comments")
    .select("*,profiles(*),locations(*)")
    .eq("location_id", id);
  return {
    props: {
      data,
    },
  };
};

const LocationPage = ({data}) => {
  const router = useRouter();
  const location = router.query;

  // the props being passed to LocationCard and CommentFooter may change

  return (
    <div>
      <LocationHeader location={location} />
      <hr />
      <LocationCard location={location} data={data}/>
      <hr />
      <CommentFooter location={location} />
      <button className="my-5 bg-cyan-900">Let's Hunt!</button>
    </div>
  );
};

export default LocationPage;
