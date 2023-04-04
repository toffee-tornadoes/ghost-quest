import { fetchAllUsers, selectAllUsers } from "@/slices/allUsersSlice";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../icons/back-icon";

const UserHeader = ({ profile, isLoading }) => {
  const router = useRouter();
  const user = useUser();
  const dispatch = useDispatch();
  // const userProfile = useSelector(selectUserProfile);
  const userProfile = profile;

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex justify-between border-b mb-5" id="locListingHeader">
      <div className="m-2 text-left text-2xl">
        <div className="flex flex-row gap-2 items-end">
          <div className="m-2 rounded-full w-12 h-12 border-2 border-slate-300 overflow-clip">
            <img
              className=""
              src={userProfile?.profile_pic}
              alt="Profile pic"
            />
            <img
              className=""
              src={userProfile?.profile_pic}
              alt="Profile pic"
            />
          </div>
          <div className="flex flex-col">
            {user.id === router.query.id ? (
              <h1>Your Profile</h1>
            ) : (
              <h1>{`${userProfile?.username}'s Profile`}</h1>
            )}

            {user.id === router.query.id ? (
              <p className="text-slate-500 italic text-base">
                {`${userProfile?.username}`} &nbsp; {user?.email}
              </p>
            ) : (
              <div className="text-slate-500 italic text-base">{`${userProfile?.username}'s spooky stats...`}</div>
            )}
          </div>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default UserHeader;


