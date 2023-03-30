// import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import UserEdit from "@/components/user/user-edit";
import { selectUserProfile } from "@/slices/userProfileSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

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
  const profile = useSelector(selectUserProfile);
  const [editStatus, setEditStatus] = useState(false);

  return (
    <div>
      <UserHeader profile={profile} /*pic={pic}*/ />
      <hr />
      <UserCard />
      <hr />
      {!editStatus ? (
        <button
          className={`w-full flex flex-row p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-green-600 hover:cursor-pointer border-green-700`}
          onClick={() => setEditStatus(!editStatus)}
        >
          <p className="w-full text-base text-slate-300 hover:text-green-400">
            Settings
          </p>
        </button>
      ) : (
        <>
          <UserEdit
            user={profile}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
          />
          <button onClick={() => setEditStatus(!editStatus)}>Test</button>
        </>
      )}
    </div>
  );
};

export default UserPage;
