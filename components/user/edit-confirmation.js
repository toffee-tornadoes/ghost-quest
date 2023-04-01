import CancelButton from "../ui/cancel-button";
import ConfirmUpdateButton from "../ui/confirm-update-button";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";

const EditConfirmation = ({
  user,
  username,
  full_name,
  setUserUpdated,
  closeToast,
}) => {
  async function updateProfile(username, full_name) {
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
        toast("Profile Updated!");
        if (error) {
          throw error;
        }
        setUserUpdated(true);
      } catch (error) {
        toast(error.message);
      }
    }
  }

  return (
    <>
      <h1 className="p-2">{`Are you sure you want to change your name to ${full_name} and your username to ${username}`}</h1>
      <ConfirmUpdateButton
        updateProfile={updateProfile}
        user={user}
        username={username}
        full_name={full_name}
      />
      <CancelButton closeToast={closeToast} />
    </>
  );
};

export default EditConfirmation;
