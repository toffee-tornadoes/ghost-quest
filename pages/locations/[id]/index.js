// // ghostquest.com/location/[id]
// This is the single location view

import CommentFooter from "@/components/location/comment-footer";
import LocationCard from "@/components/location/location-card";
import LocationHeader from "@/components/location/location-header";
import { useRouter } from "next/router";
import {  useSelector } from "react-redux";
import { selectUserComments } from "@/slices/userCommentsSlice";


const LocationPage = () => {
  const router = useRouter();
  const location = router.query;
  const userComments = useSelector(selectUserComments);
  console.log(userComments);

  // the props being passed to LocationCard and CommentFooter may change

  return (
    <div>
      <LocationHeader location={location} />
      <hr />
      <LocationCard location={location} userComments={userComments} />
      <hr />
      <CommentFooter location={location} />
      <button className="my-5 bg-cyan-900">Let's Hunt!</button>
    </div>
  );
};

export default LocationPage;
