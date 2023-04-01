import { useState, useEffect, Fragment } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useDispatch } from "react-redux";
import ReactDropzone from "react-dropzone";
import { fetchUserProfile } from "@/slices/userProfileSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditConfirmation from "./edit-confirmation";
import DeleteConfirmation from "./delete-profile-confirmation";

const UserEdit = ({ user, editStatus, setEditStatus }) => {
  const dispatch = useDispatch();
  const supabase = useSupabaseClient();
  const [userUpdated, setUserUpdated] = useState(false);

  const [username, setUsername] = useState("");
  const [full_name, setFullname] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile(user?.id));
    setUserUpdated(false);
  }, [userUpdated]);

  const editConfirmation = () =>
    toast(
      <EditConfirmation
        user={user}
        username={username}
        full_name={full_name}
        setUserUpdated={setUserUpdated}
      />
    );

  const deleteConfirmation = () => {
    toast(<DeleteConfirmation user={user} />);
  };

  const warning = () => {
    toast("Please enter a new username and full name");
  };

  const handleFileChange = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handlePicSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(file.name, file);
    console.log("Data key: ", data);
    if (error) {
      console.log("Error uploading file: ", error);
      return;
    }

    const { data: publicURL, error: urlError } = await supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    console.log(publicURL.publicUrl);
    console.log(file.name === data.path);

    //{"publicUrl":"https://nhpfatsjworjodawkvdl.supabase.co/storage/v1/object/public/avatars/%5Bobject%20Object%5D"}

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
    <div
      id="settingsModal"
      className="backdrop-blur-3xl fixed flex items-center justify-center h-full w-full "
    >
      <form
        className="w-3/4 h-min mt-10 p-5 flex flex-col rounded-lg border-dashed border-2 border-yellow-400 bg-slate-900 content-center items-center"
        onSubmit={(evt) => evt.preventDefault()}
      >
        <label htmlFor="full_name">Edit Full Name</label>
        <input
          className="w-1/4 text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
          id="full_name"
          type="text"
          value={full_name || ""}
          placeholder="full name..."
          onChange={(e) => setFullname(e.target.value)}
        />

        <label htmlFor="username">Edit Username</label>
        <input
          className="w-1/4 text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
          id="username"
          type="text"
          value={username || ""}
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="w-full flex-col">
          <button
            className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-green-600 hover:cursor-pointer border-green-700 justify-center`}
            onClick={() => {
              if (username && full_name) return editConfirmation();
              return warning();
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
        <div
          className={
            "w-1/4 p-2 border-dashed border-white border-2 hover:bg-slate-600"
          }
        >
          <ReactDropzone onDrop={handleFileChange}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {file ? (
                  <p>Selected file: {file.name}</p>
                ) : (
                  <p>Drag and drop a file here, or click to select a file</p>
                )}
              </div>
            )}
          </ReactDropzone>
          <button onClick={handlePicSubmit}>Save Profile Pic</button>
        </div>
        <button
          className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-red-600 hover:cursor-pointer border-red-700 justify-center`}
          onClick={deleteConfirmation}
        >
          <p className="w-full text-base text-slate-300 hover:text-red-400">
            Delete Account
          </p>
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
