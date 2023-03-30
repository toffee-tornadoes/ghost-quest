import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import HomeButtonGr from "../ui/home-button-gr";
import { resetUserComments } from "@/slices/userCommentsSlice";
import { resetUserLocation } from "@/slices/userLocationSlice";
import { resetUserSavedLocs } from "@/slices/userSavedLocsSlice";
import {
  fetchUserProfile,
  resetUserProfile,
  selectUserProfile,
} from "@/slices/userProfileSlice";

const UserEdit = () => {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = useSupabaseClient();
  const userProfile = useSelector(selectUserProfile);
  const [userUpdated, setUserUpdated] = useState(false);

  const [username, setUsername] = useState("");
  const [full_name, setFullname] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile(user?.id));
    console.log("fetch user", fetchUserProfile);
    console.log("user", user);
    setUserUpdated(false);
  }, [userUpdated]);

  async function updateProfile() {
    // const avatar_url = `public/avatar${user?.id}.png`;
    const updates = {
      id: user.id,
      username,
      full_name,
      // avatar_url,
      updated_at: new Date(),
    };
    if (username.length && full_name.length) {
      try {
        let { error } = await supabase.from("profiles").upsert(updates);
        alert("profile updated");
        if (error) {
          throw error;
        }
        setUserUpdated(true);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("please enter a username and your full name the press update");
    }
  }

  const handleSignOut = () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");
    if (confirmSignout) {
      supabase.auth.signOut();
      dispatch(resetUserLocation());
      dispatch(resetUserComments());
      dispatch(resetUserSavedLocs());
      dispatch(resetUserProfile());
      console.log("signed out");
      router.push(`/`);
    }
  };

  // async function storeProfilePic(file) {
  //   try {
  //     const avatarFile = file;
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .upload(`public/avatar${user?.id}.png`, avatarFile, {
  //         cacheControl: "3600",
  //         upsert: true,
  //       });
  //     if (error) {
  //       throw error;
  //     }else{
  //       alert('profile updated')
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  return (
    <div className="m-4 flex flex-col">
      <label htmlFor="full_name">fullname</label>
      <input
        className="text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
        id="full_name"
        type="text"
        value={full_name || ""}
        onChange={(e) => setFullname(e.target.value)}
      />

      <label htmlFor="username">Username</label>
      <input
        className="text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
        id="username"
        type="text"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* <h4>Select Image</h4>
      <input
        className="text-sm text-grey-500
            file:mr-5 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-purple-600 file:to-green-600
            hover:file:cursor-pointer hover:file:opacity-80"
        type="file"
        name="myImage"
        onChange={(e) => storeProfilePic(e.target.files)}
      /> */}

      <button
        className="w-full flex justify-center"
        onClick={() => {
          updateProfile({ username });
        }}
      >
        update username
      </button>
      <div>
        <button onClick={handleSignOut} className="w-full flex justify-center">
          <HomeButtonGr link={`/user/${user?.id}` || `/`} text="Sign Out" />
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
