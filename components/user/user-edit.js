import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
const UserEdit = () => {
  const user = useUser();

  const [username, setUsername] = useState("");
  const [full_name, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);

  async function updateProfile({ username }) {
    try {
      const avatar_url = `public/avatar${user?.id}.png`;
      const updates = {
        id: user.id,
        username,
        full_name,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
    console.log(user);
  }

  async function storeProfilePic(file) {
    try {
      const avatarFile = file;
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`public/avatar${user?.id}.png`, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) {
        throw error;
      }else{
        alert('profile updated')
      }
    } catch (error) {
      alert(error.message);
    }
  }

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

      <h4>Select Image</h4>
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
      />

      <button
        className="flex flex-row justify-between pl-2 pr-2 border-solid border-2 hover:bg-slate-900 rounded-md border-purple-600 text-purple-600 hover:cursor-pointer hover:border-green-600 hover:text-green-600"
        onClick={() => {
          updateProfile({ username });
        }}
      >
        update
      </button>
    </div>
  );
};

export default UserEdit;
