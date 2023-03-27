import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@supabase/auth-ui-shared";
import BackIcon from "../icons/back-icon";


const UserHeader = ({profile, pic}) => {
  const user = useUser();
  console.log(pic.publicUrl)
  return (
    <div className="flex justify-between" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <img src={pic.publicUrl} width='20px' height={'20px'} alt='profile picture'></img>
        <h1>{profile[0]?.username}</h1>
        <p className="text-slate-500 italic text-base">{user && user.email}</p>
        {/* <h1 className="text-lg text-orange-700 sticky text-left border-orange-700 border-b">Haunts within 20 miles:</h1> */}
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default UserHeader;
