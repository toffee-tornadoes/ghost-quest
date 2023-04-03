// ghostquest.com/user/[id]/visited
// import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import LocationListingCard from "@/components/locations/loc-listing-card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserVisitedLocs,
  selectUserVisitedLocs,
} from "@/slices/userVisitedSlice";
import VisitedHeader from "@/components/visited/visited-header";
import { useRouter } from "next/router";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserPlacesVisitedPage = ({ data }) => {
  const router = useRouter();
  const profile = useSelector(selectUserProfile);
  // console.log("user profile:", profile)
  // const user = useUser();
  const dispatch = useDispatch();
  const userVisitedLocs = useSelector(selectUserVisitedLocs);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserVisitedLocs(router.query.id));
    dispatch(fetchUserProfile(router.query.id)).then(()=>{
      setIsLoading(false)
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        {/* <VisitedHeader profile={profile} /> */}
        <div className="pt-2 text-slate-500">
          Loading your results...
          <br />
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl mt-3"
            spinPulse
          />
        </div>
      </div>
    );
  }

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
