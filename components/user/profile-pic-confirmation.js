import CancelButton from "../ui/cancel-button";
import ConfirmProfilePicUpdate from "../ui/confirm-profile-pic-update-button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProfilePicUpdateConfirmation = ({ user, closeToast, file }) => {
  const dispatch = useDispatch();
  const supabase = useSupabaseClient();

  const handlePicSubmit = async (user) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(file.name, file);
    } catch (error) {
      toast("Error uploading file: ", error.message);
      return;
    }

    const { data: publicURL, error: urlError } = await supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    console.log(publicURL.publicUrl);
    console.log(file.name === data.path);

    const { data: updateData, error: updateDataError } = await supabase
      .from("profiles")
      .update({ profile_pic: publicURL.publicUrl })
      .eq("id", user.id);

    if (updateDataError) {
      console.log("Error updating user profile pic: ", updateDataError);
      return;
    }

    console.log("Profile pic updated successfully!");
    dispatch(fetchUserProfile(user?.id));
  };
  return (
    <>
      <h1 className="p-2">{"Are you sure you want to upload this picture?"}</h1>
      <ConfirmProfilePicUpdate handlePicSubmit={handlePicSubmit} user={user} />
      <CancelButton closeToast={closeToast} />
    </>
  );
};

export default ProfilePicUpdateConfirmation;
