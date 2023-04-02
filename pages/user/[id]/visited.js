// ghostquest.com/user/[id]/visited
// import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import LocationListingCard from "@/components/locations/loc-listing-card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserVisitedLocs,
  selectUserVisitedLocs,
} from "@/slices/userVisitedSlice";
import VisitedHeader from "@/components/visited/visited-header";
import { useRouter } from "next/router";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";

const UserPlacesVisitedPage = ({ data }) => {
  const router = useRouter();
  const profile = useSelector(selectUserProfile);
  // console.log("user profile:", profile)
  // const user = useUser();
  const dispatch = useDispatch();
  const userVisitedLocs = useSelector(selectUserVisitedLocs);

  useEffect(() => {
    dispatch(getUserVisitedLocs(router.query.id));
    dispatch(fetchUserProfile(router.query.id));
  }, []);

  // useEffect(() => {
  //   dispatch(fetchUserProfile(router.query.id));
  // }, [router, dispatch]);
  // console.log(userProfile?.profile_pic);

  return (
    <div>
      <VisitedHeader profile={profile} />
      <div>
        {userVisitedLocs ||
        userVisitedLocs.length >= 1 ||
        userVisitedLocs !== null ? (
          <LocationListingCard locations={userVisitedLocs} />
        ) : (
          <h3>You haven't haunted anything yet!</h3>
        )}
      </div>
    </div>
  );
};

export default UserPlacesVisitedPage;
