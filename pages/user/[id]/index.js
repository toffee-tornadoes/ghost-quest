import { useSupabaseClient } from "@supabase/auth-helpers-react";
import UserEdit from "@/components/user/user-edit";
import { selectUserProfile } from "@/slices/userProfileSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import HomeButtonRed from "@/components/ui/home-button-red";
import { toast, ToastContainer } from "react-toastify";
import SignoutConfirmation from "@/components/user/signout-confirmation";

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

const UserPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const [editStatus, setEditStatus] = useState(false);
  const supabase = useSupabaseClient();

  const signoutConfirmation = () => {
    toast(<SignoutConfirmation />);
  };

  return (
    <div>
      <UserHeader profile={profile} />
      <UserCard />
      <div
        id="settingsSignOut"
        className="w-full flex flex-col justify-center items-center flex-wrap mt-10 gap-4"
      >
        {!editStatus ? (
          <button
            className={`w-1/2 flex p-2 border-solid border-2 hover:bg-slate-900 rounded-md  hover:border-yellow-600 hover:cursor-pointer border-yellow-700 justify-center`}
            onClick={() => setEditStatus(!editStatus)}
          >
            <p className="text-base w-3/4 text-slate-300 hover:text-yellow-400 ">
              Settings
            </p>
          </button>
        ) : (
          <UserEdit
            user={profile}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
          />
        )}
        <button
          className="w-1/2 flex justify-center"
          onClick={signoutConfirmation}
        >
          Signout
          {/* <HomeButtonRed link={`/`} text="Sign Out" /> */}
        </button>
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
