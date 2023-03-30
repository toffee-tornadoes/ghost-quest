import { Fragment } from "react";
import Link from "next/link";

const CommentCard = ({ comment }) => {
  return (
    <Fragment key={comment.id}>
      <div
        id="commentCard"
        className="flex flex-col p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 border-orange-600"
      >
        {comment.profiles && (
          <div
            className="flex text-left pl-2"
            // href={`/user/${comment.profiles.id}`}
          >
            <Link className="text-orange-600 italic hover:text-orange-300" href={`/user/${comment.profiles.id}`}>
              {`${comment.profiles.username}`}
            </Link>
            <p className="text-slate-400">&nbsp;said:</p>
          </div>
        )}
        <div className="px-3 hover:bg-slate-800 bg-slate-900 border-solid border-2 border-slate-800 rounded-lg m-2 text-slate-400 text-left">
          {comment.content}
        </div>
      </div>
    </Fragment>
  );
};

export default CommentCard;
