// // ghostquest.com/location/[id]
// This is the single location view

import CommentFooter from "@/components/location/comment-footer";
import LocationCard from "@/components/location/location-card";
import LocationHeader from "@/components/location/location-header";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUserComments } from "@/slices/userCommentsSlice";
import {
  getUserVisitedLocs,
  selectUserVisitedLocs,
} from "@/slices/userVisitedSlice";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { getUserSavedLocs, selectUserSavedLocs } from "@/slices/userSavedLocsSlice";

const LocationPage = () => {
  const router = useRouter();
  const user = useUser();
  const dispatch = useDispatch();
  const location = router.query;
  const userComments = useSelector(selectUserComments);
  const userVisitedLocs = useSelector(selectUserVisitedLocs);
  const userSavedLocs = useSelector(selectUserSavedLocs);
  // console.log(userSavedLocs)
  const [hasVisited, setHasVisited] = useState(null)
  // console.log("has visited:", userVisitedLocs)

  useEffect(()=>{
    const curr = userVisitedLocs?.filter((loc) => {
      return loc.id == location.id;
    });

    if (curr.length > 0) {
      setHasVisited(true);
    } else {
      setHasVisited(false);
    }
  }, [userVisitedLocs, userSavedLocs])

  // console.log("has visited: ", hasVisited);

  useEffect(() => {
    dispatch(getUserVisitedLocs(user?.id));
    dispatch(getUserSavedLocs(user?.id));
  }, []);

  // the props being passed to LocationCard and CommentFooter may change

  return (
    <div>
      <LocationHeader state={hasVisited} location={location} />
      <hr />
      <LocationCard location={location} userComments={userComments} />
      {/* <hr /> */}
      <CommentFooter location={location} />
      {/* <button className="my-5 bg-cyan-900">Let's Hunt!</button> */}
    </div>
  );
};

export default LocationPage;
