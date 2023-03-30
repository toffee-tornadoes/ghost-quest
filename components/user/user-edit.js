import { useState, useEffect, Fragment } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from "react-redux";

import { fetchUserProfile, resetUserProfile } from "@/slices/userProfileSlice";
import Router from "next/router";

const UserEdit = ({ user, editStatus, setEditStatus }) => {
  console.log("user: ", user);
  console.log("editStatus: ", editStatus);
  console.log("setEditStatus: ", setEditStatus);

  const dispatch = useDispatch();
  const supabase = useSupabaseClient();
  const [userUpdated, setUserUpdated] = useState(false);

  const [username, setUsername] = useState("");
  const [full_name, setFullname] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile(user?.id));
    setUserUpdated(false);
  }, [userUpdated]);

  async function updateProfile() {
    // const avatar_url = `public/avatar${user?.id}.png`;
    const updates = {
      id: user?.id,
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

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const confirmDeleteAccount = window.confirm(
        "Are you sure you want to quit ghost hunting?"
      );
      if (confirmDeleteAccount) {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", userId);
        supabase.auth.signOut();
        Router.push("/");
      }
    } catch (err) {
      alert(err.message);
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
    <Fragment>
      <form
        className="w-3/4 mt-10 p-5 flex flex-col border-solid border-2 border-slate-200 bg-black content-center"
        onSubmit={(evt) => evt.preventDefault()}
      >
        <label htmlFor="full_name">Edit Full Name</label>
        <input
          className="text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
          id="full_name"
          type="text"
          value={full_name || ""}
          placeholder="full name..."
          onChange={(e) => setFullname(e.target.value)}
        />

        <label htmlFor="username">Edit Username</label>
        <input
          className="text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
          id="username"
          type="text"
          value={username || ""}
          placeholder="username..."
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
        <div className="w-full flex-col">
          <button
            className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-green-600 hover:cursor-pointer border-green-700 justify-center`}
            onClick={() => {
              updateProfile({ username });
            }}
          >
            <p className="w-full text-base text-slate-300 hover:text-green-400">
              Update Username
            </p>
          </button>
          <button
            className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-red-600 hover:cursor-pointer border-red-700 justify-center`}
            onClick={() => setEditStatus(!editStatus)}
          >
            <p className="w-full text-base text-slate-300 hover:text-red-400">
              Cancel
            </p>
          </button>
        </div>
        <buttton
          className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-red-600 hover:cursor-pointer border-red-700 justify-center`}
          onClick={() => handleDelete(user?.id)}
        >
          <p className="w-full text-base text-slate-300 hover:text-red-400">
            Delete Account
          </p>
        </buttton>
      </form>
    </Fragment>
  );
};

export default UserEdit;
