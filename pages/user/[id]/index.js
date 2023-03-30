import { useSupabaseClient } from "@supabase/auth-helpers-react";
import UserEdit from "@/components/user/user-edit";
import { selectUserProfile } from "@/slices/userProfileSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import HomeButtonGr from "@/components/ui/home-button-gr";
import { resetUserComments } from "@/slices/userCommentsSlice";
import { resetUserLocation } from "@/slices/userLocationSlice";
import { resetUserSavedLocs } from "@/slices/userSavedLocsSlice";
import { resetUserProfile } from "@/slices/userProfileSlice";

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

// export const getServerSideProps = async (context) => {
//   const { id } = context.params;
//   const { data } = await supabase
//     .from("user_locations")
//     .select("* ,profiles(*)")
//     .eq("profile_id", id);
//   const { data: profile } = await supabase
//     .from("profiles")
//     .select()
//     .eq("id", id);
//   const { data: pic } = supabase.storage
//     .from("public-bucket")
//     .getPublicUrl(`folder/avatar${id}.png`, {
//       transform: {
//         width: 20,
//         height: 20,
//       },
//     });
//   return {
//     props: {
//       data,
//       profile,
//       pic,
//     },
//   };
// };

const UserPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const [editStatus, setEditStatus] = useState(false);
  const supabase = useSupabaseClient();

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
      <UserHeader profile={profile} /*pic={pic}*/ />
      <hr />
      <UserCard />
      <hr />
      <div className="w-full flex flex-col justify-center content-center flex-wrap">
        {!editStatus ? (
          <button
            className={`w-3/4 flex flex-row p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-green-600 hover:cursor-pointer border-green-700 justify-center`}
            onClick={() => setEditStatus(!editStatus)}
          >
            <p className="text-base text-slate-300 hover:text-green-400 ">
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
        <button onClick={handleSignOut} className="flex justify-center">
          <HomeButtonGr link={`/`} text="Sign Out" />
        </button>
      </div>
    </div>
  );
};

export default UserPage;
