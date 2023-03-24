import Link from "next/link";
import FavoriteIcon from "../icons/favorite-icon";

const FaveButton = ({ text, link }) => {
  return (

    <div className={`w-3/4 flex flex-row p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-1 hover:border-purple-600 hover:cursor-pointer border-slate-700`}>
      <Link
        className="w-full text-base text-slate-300 hover:text-purple-400"
        href={`/${link}`}
      >
        <h2 className="text-center">
          {text}
        </h2>
      </Link>
      <button>
        <FavoriteIcon />
      </button>
    </div>
  );
};

export default FaveButton;
