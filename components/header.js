import Link from "next/link";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";

const Header = ({ clickHandler, navUp }) => {
  return (
    <div>
      <div
        id={"headerContainer"}
        className="p-5 w-full flex justify-between z-10 absolute top-0 "
      >
        <Link onClick={!navUp && clickHandler} href="/user/[id]">
          <UserIcon />
        </Link>
        <Link onClick={!navUp && clickHandler} href="/search">
          <SearchIcon />
        </Link>
      </div>
    </div>
  );
};

export default Header;
