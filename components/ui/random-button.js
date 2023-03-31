import Link from "next/link";
import RandomIcon from "../icons/random-icon";

const RandomButton = ({ text, link, location }) => {
  return (
    <Link
      href={{ pathname: `/${link}`, query: location }}
      className={`w-3/4 flex flex-row p-2 border-solid border-2
    hover:bg-slate-900 rounded-md m-2 hover:border-orange-600 hover:cursor-pointer border-slate-700`}
    >
      <div
        className="w-full text-base text-slate-300 hover:text-orange-400"
        href={`/${link}`}
      >
        <h2 className="text-center">{text}</h2>
      </div>
      <RandomIcon />
    </Link>
  );
};

export default RandomButton;
