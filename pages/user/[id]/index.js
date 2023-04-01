import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import UserEdit from "@/components/user/user-edit";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { resetUserComments } from "@/slices/userCommentsSlice";
import { resetUserLocation } from "@/slices/userLocationSlice";
import { resetUserSavedLocs } from "@/slices/userSavedLocsSlice";
import { resetUserProfile } from "@/slices/userProfileSlice";
import HomeButtonRed from "@/components/ui/home-button-red";
import { useRouter } from "next/router";
import ProfileCard from "@/components/profile/profile-card";

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

const UserPage = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const [editStatus, setEditStatus] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUserProfile(router.query.id));
    // dispatch(fetchAllUsers());
  }, [router, dispatch]);

  const handleSignOut = () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");
    if (confirmSignout) {
      supabase.auth.signOut();
      dispatch(resetUserLocation());
      dispatch(resetUserComments());
      dispatch(resetUserSavedLocs());
      dispatch(resetUserProfile());
    }
  };

  return (
    <div>
    <UserHeader profile={profile} />
      {user?.id === router.query.id ? <UserCard /> : <ProfileCard profile={profile} />}
      <div
        id="settingsSignOut"
        className="w-full flex flex-col justify-center items-center flex-wrap mt-10 gap-4"
      >
        {!editStatus ? (
          <Fragment>
            {user?.id === router.query.id ? (
              <button
                className={`w-1/2 flex p-2 border-solid border-2 hover:bg-slate-900 rounded-md  hover:border-yellow-600 hover:cursor-pointer border-yellow-700 justify-center`}
                onClick={() => setEditStatus(!editStatus)}
              >
                <p className="text-base w-3/4 text-slate-300 hover:text-yellow-400 ">
                  Settings
                </p>
              </button>
            ) : (
              <div></div>
            )}
          </Fragment>
        ) : (
          <UserEdit
            user={profile}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
          />
        )}
        {user?.id === router.query.id ? (
          <button onClick={handleSignOut} className="w-1/2 flex justify-center">
            <HomeButtonRed link={`/`} text="Sign Out" />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
