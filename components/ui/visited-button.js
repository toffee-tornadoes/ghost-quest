import Link from "next/link";
import HomeIcon from "../icons/home-icon";

const VisitedButton = ({ text, link }) => {
  return (
    <Link
      href={`/${link}`}
      className={`w-3/4 flex flex-row p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-1 hover:border-green-600 hover:cursor-pointer border-slate-700`}
    >
      <div className="w-full text-base text-slate-300 hover:text-green-400">
        <h2 className="text-center">{text}</h2>
      </div>
      <button>
        {/* add visited icon */}
      </button>
      <HomeIcon />
    </Link>
  );
};

export default VisitedButton;
