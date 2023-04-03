import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import UserEdit from "@/components/user/user-edit";
import { fetchUserProfile, selectUserProfile } from "@/slices/userProfileSlice";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import HomeButtonRed from "@/components/ui/home-button-red";
import { toast, ToastContainer } from "react-toastify";
import SignoutConfirmation from "@/components/user/signout-confirmation";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUserProfile(router.query.id)).then(() => {
      setIsLoading(false);
    });
    // dispatch(fetchAllUsers());
  }, [router, dispatch]);

  const signoutConfirmation = () => {
    toast(<SignoutConfirmation />);
  };

  if (isLoading) {
    return (
      <div>
      </div>
    );
  }

  return (
    <div>
      <UserHeader isLoading={isLoading} profile={profile} />
      {user?.id === router.query.id ? (
        <UserCard />
      ) : (
        <ProfileCard profile={profile} />
      )}
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
          <button
            className={`w-1/2 flex p-2 border-solid border-2 hover:bg-slate-900 rounded-md  hover:border-red-600 hover:cursor-pointer border-red-700 justify-center`}
            onClick={signoutConfirmation}
          >
            <p className="w-full text-base text-slate-300 hover:text-red-400">
              {" "}
              Signout
            </p>
            {/* <HomeButtonRed link={`/`} text="Sign Out" /> */}
          </button>
        ) : (
          <div></div>
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
        />{" "}
      </div>
    </div>
  );
};

export default UserPage;
