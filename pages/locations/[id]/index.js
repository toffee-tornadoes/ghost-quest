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
import {
  getUserSavedLocs,
  selectUserSavedLocs,
} from "@/slices/userSavedLocsSlice";

const LocationPage = () => {
  const router = useRouter();
  const user = useUser();
  const dispatch = useDispatch();
  const location = router.query;
  const userComments = useSelector(selectUserComments);
  const userVisitedLocs = useSelector(selectUserVisitedLocs);
  const userSavedLocs = useSelector(selectUserSavedLocs);
  const [hasVisited, setHasVisited] = useState(null);

  useEffect(() => {
    const curr = userVisitedLocs?.filter((loc) => {
      return loc.id == location.id;
    });

    if (curr.length > 0) {
      setHasVisited(true);
    } else {
      setHasVisited(false);
    }
  }, [userVisitedLocs, userSavedLocs]);

  useEffect(() => {
    dispatch(getUserVisitedLocs(user?.id));
    dispatch(getUserSavedLocs(user?.id));
  }, []);

  return (
    <div>
      <LocationHeader state={hasVisited} location={location} />
      <hr />
      <LocationCard location={location} userComments={userComments} />
      <CommentFooter location={location} />
    </div>
  );
};

export default LocationPage;
