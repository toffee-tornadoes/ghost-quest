import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../icons/back-icon";

const UserHeader = ({ profile, pic }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    dispatch(fetchUserProfile(user?.id));
  }, []);
  console.log(userProfile?.profile_pic);
  return (
    <div className="flex justify-between border-b mb-5" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <div className="flex flex-row gap-2 items-end">
          <div className="m-2 rounded-full w-16 h-16 border-2 border-slate-300 overflow-clip">
            <img
              className=""
              src={userProfile?.profile_pic}
              alt="Profile pic"
            />
          </div>
          <div className="flex flex-col">
            <h1>{userProfile?.username}</h1>
            <p className="text-slate-500 italic text-base">{user?.email}</p>
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
