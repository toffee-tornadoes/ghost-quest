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
      const updates = {
        id: user.id,
        username,
        full_name,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }

    async function storeProfilePic({ event }) {
      try {
        const avatarFile = event.target.files[0];
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload("public/avatar1.png", avatarFile, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          throw error;
        }
      } catch (error) {
        alert(error.message);
      }
    }

  return (
    <div>
      <div>
        <label htmlFor="full_name">fullname</label>
        <input
          id="full_name"
          type="text"
          value={full_name || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <h4>Select Image</h4>
      <input
        type="file"
        name="myImage"
        onChange={(e) => storeProfilePic(e)}
      />

      <div>
        <button
          className="button primary block"
          onClick={() => {
            updateProfile({ username });
          }}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
