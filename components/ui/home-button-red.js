import Link from "next/link";
// import FavoriteIcon from "../icons/favorite-icon 3";

const HomeButtonRed = ({ text, link }) => {
  return (

    <Link href={`/${link}`} className={`w-full flex flex-row p-2 border-solid border-2
    hover:bg-slate-900 rounded-md hover:border-red-600 hover:cursor-pointer border-red-700`}>
      <div
        className="w-full text-base text-slate-300 hover:text-red-400"
        href={`/${link}`}
      >
        <h2 className="text-center">
          {text}
        </h2>
      </div>
      {/* <button>
        <FavoriteIcon />
      </button> */}
    </Link>
  );
};

export default HomeButtonRed;
