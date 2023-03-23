import Link from "next/link";
// import FavoriteIcon from "../icons/favorite-icon 3";

const HomeButton = ({text, link}) => {
  return (
    <div className="w-3/4 flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
      <Link
        className="w-full text-base text-left text-slate-300 hover:text-purple-400"
        href={`/${link}`}
      >
        <h2 className="flex">
          {text}
        </h2>
      </Link>
      {/* <button>
        <FavoriteIcon />
      </button> */}
    </div>
  );
};

export default HomeButton;
