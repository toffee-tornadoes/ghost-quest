import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../icons/back-icon";

const UserHeader = ({ profile, pic }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);

  useEffect(()=>{
    dispatch(fetchUserProfile(user?.id))
  }, [])

  return (
    <div className="flex justify-between border-b mb-5" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <h1>{userProfile?.username}</h1>
        <p className="text-slate-500 italic text-base">{user?.email}</p>

      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default UserHeader;
