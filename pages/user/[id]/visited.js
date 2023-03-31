// ghostquest.com/user/[id]/visited
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import LocationListingCard from "@/components/locations/loc-listing-card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserVisitedLocs,
  selectUserVisitedLocs,
} from "@/slices/userVisitedSlice";
import VisitedHeader from "@/components/visited/visited-header";

const UserPlacesVisitedPage = ({ data }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const userVisitedLocs = useSelector(selectUserVisitedLocs);

  useEffect(() => {
    dispatch(getUserVisitedLocs(user?.id));
  }, []);

  return (
    <div>
      <VisitedHeader />
      <div>
        {userVisitedLocs ||
        userVisitedLocs.length >= 1 ||
        userVisitedLocs !== null ? (
          <LocationListingCard locations={userVisitedLocs} />
        ) : (
          <h3>
            You haven't haunted anything yet!
          </h3>
        )}
      </div>
    </div>
  );
};

export default UserPlacesVisitedPage;
