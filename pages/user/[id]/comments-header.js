import BackIcon from "@/components/icons/back-icon";
import { useUser } from "@supabase/auth-helpers-react";

const CommentsHeader = ({ profile, isLoading }) => {
  const user = useUser();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div
      className="border-b-white border-b flex justify-between mb-5"
      id="comments-header"
    >
      <div className="m-2 text-left text-2xl">
        <div className="flex flex-row gap-2 items-end">
          <div className="m-2 rounded-full w-16 h-16 border-2 border-slate-300 overflow-clip">
            <img className="" src={profile?.profile_pic} alt="Profile pic" />
          </div>
          <div className="flex flex-col">
            {profile?.id === user?.id ? (
              <h1 className="w-full">Your Comments</h1>
            ) : (
              <h1 className="w-full">{`${profile?.username}'s Comments`}</h1>
            )}
            <div className="text-slate-500 italic text-base">
              Comment History...
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

export default CommentsHeader;
