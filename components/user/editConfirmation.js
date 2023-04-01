import CancelButton from "../ui/cancel-button";
import ConfirmUpdateButton from "../ui/confirm-update-button";

const EditConfirmation = () => {
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

  return (
    <>
      <h1 className="p-2">Test</h1>
      <ConfirmUpdateButton />
      <CancelButton onClick={console.log("testing")} />
    </>
  );
};

export default EditConfirmation;
