import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import BackIcon from "../icons/back-icon";

const VisitedHeader = ({ profile }) => {
  const router = useRouter();
  const user = useUser();

  return (
    <div
      className="border-b-white border-b flex justify-between mb-5"
      id="visited-header"
    >
      <div className="m-2 text-left text-3xl">
        <div className="flex flex-row gap-2 items-end">
          <div className="m-2 rounded-full w-16 h-16 border-2 border-slate-300 overflow-clip">
            <img src={profile?.profile_pic} alt="Profile pic" />
          </div>
          <div className="flex flex-col">
            {profile?.id === user?.id ? (
              <h1 className="w-full">Your Visits</h1>
            ) : (
              <h1 className="w-full">{`${profile?.username}'s Visits`}</h1>
            )}
            <div className="text-slate-500 italic text-base">
              Visit history...
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default VisitedHeader;
