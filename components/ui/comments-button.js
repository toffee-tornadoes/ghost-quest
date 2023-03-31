import Link from "next/link";
import CommentIcon from "../icons/comment-icon";

const CommentsButton = ({ text, link }) => {
  return (

    <Link href={`/${link}`} className={`w-3/4 flex flex-row p-2 border-solid border-2
    hover:bg-slate-900 rounded-md m-2 hover:border-orange-600 hover:cursor-pointer border-slate-700`}>
      <div
        className="w-full text-base text-slate-300 hover:text-orange-400"
        href={`/${link}`}
      >
        <h2 className="text-center">
          {text}
        </h2>
      </div>
      <CommentIcon />
    </Link>
  );
};

export default CommentsButton;
