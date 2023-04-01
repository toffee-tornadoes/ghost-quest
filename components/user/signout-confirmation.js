import ConfirmSignoutButton from "../ui/confirm-signout-button";
import CancelButton from "../ui/cancel-button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from "react-redux";
import { resetUserComments } from "@/slices/userCommentsSlice";
import { resetUserLocation } from "@/slices/userLocationSlice";
import { resetUserSavedLocs } from "@/slices/userSavedLocsSlice";
import { resetUserProfile } from "@/slices/userProfileSlice";

const SignoutConfirmation = ({ closeToast }) => {
  const supabase = useSupabaseClient();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    supabase.auth.signOut();
    dispatch(resetUserLocation());
    dispatch(resetUserComments());
    dispatch(resetUserSavedLocs());
    dispatch(resetUserProfile());
  };

  return (
    <>
      <h1 className="p-2">Are you sure you want to sign out?</h1>
      <ConfirmSignoutButton handleSignOut={handleSignOut} />
      <CancelButton closeToast={closeToast} />
    </>
  );
};

export default SignoutConfirmation;
