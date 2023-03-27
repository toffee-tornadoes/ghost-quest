import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
const UserEdit = () => {
  const user = useUser();

  const [thisusername, setThisUsername] = useState("");
  const [thisFullname, setThisFullname] = useState("");
  const [thisphone, setThisPhone] = useState("");

  const [loading, setLoading] = useState(true);

  async function updateProfile({ thisusername }) {
    try {
      console.log(thisusername)
      const { data, error } = await supabase
        .from("profiles")
        .insert([{ username: `${thisusername}` }]).eq('id', `${user.id}`);
      console.log(user);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    }
  }

  return (
    <div>
      {/* <div>
        <label htmlFor="thisFullname">fullname</label>
        <input
          id="thisFullname"
          type="text"
          value={thisFullname || ''}
          onChange={(e) => setThisFullname(e.target.value)}
        />
      </div> */}
      <div>
        <label htmlFor="thisusername">Username</label>
        <input
          id="thisusername"
          type="text"
          value={thisusername || ""}
          onChange={(e) => setThisUsername(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ thisusername })}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
