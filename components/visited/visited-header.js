import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import BackIcon from "../icons/back-icon";

const VisitedHeader = ({ profile }) => {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="flex border-b justify-between mb-5" id="searchHeader">
      <div className="m-2 text-left text-3xl">
        {router.query.id === user.id ? (
          <h1>Your Visits</h1>
        ) : (
          <h1>{`${profile.username}'s Visits`}</h1>
        )}
        <div className="text-slate-500 italic text-base">
          <h1>{`Places ${profile.username} has haunted...`}</h1>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default VisitedHeader;
