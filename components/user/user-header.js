import { useUser } from "@supabase/auth-helpers-react";
import BackIcon from "../icons/back-icon";
const UserHeader = () => {
  const user = useUser();
  return (
    <div className="flex justify-between" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <h1>Your Account</h1>
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
