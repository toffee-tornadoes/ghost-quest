import ConfirmDeleteButton from "../ui/confirm-delete-button";
import CancelButton from "../ui/cancel-button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Router from "next/router";

const DeleteConfirmation = ({ user, closeToast }) => {
  const supabase = useSupabaseClient();

  const handleDelete = async (userId) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);
      supabase.auth.signOut();
      Router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h1 className="p-2">Are you sure you want to quit ghost hunting?</h1>
      <ConfirmDeleteButton handleDelete={handleDelete} user={user} />
      <CancelButton closeToast={closeToast} />
    </>
  );
};

export default DeleteConfirmation;
