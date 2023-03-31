import { Fragment } from "react";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

const CommentCard = ({ comment }) => {
  const user = useUser();
  const formattedDate = new Date(comment.created_at).toLocaleTimeString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  return (
    <Fragment key={comment.id}>
      <div
        id="commentCard"
        className="flex flex-col p-1 border-solid border-2 hover:bg-slate-900 rounded-md m-2 border-orange-700"
      >
        {comment.profiles && (
          <div className="flex text-left justify-between pl-2">
            <div className="flex">
              <Link
                className="text-orange-700 italic hover:text-orange-300"
                href={user ? `/user/${comment.profiles.id}` : "/user/"}
              >
                {`${comment.profiles.username}`}
              </Link>
              <p className="text-slate-400">&nbsp;said:</p>
            </div>
            <div className="pr-2">
              <p className="text-slate-600">{`${formattedDate}`}</p>
            </div>
          </div>
        )}
        <div className="px-2 p-1 hover:bg-slate-800 bg-slate-900 border-solid border-2 border-slate-800 rounded-lg m-2 text-slate-400 text-left">
          {comment.content}
        </div>
      </div>
    </Fragment>
  );
};

export default CommentCard;
