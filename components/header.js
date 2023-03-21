import Link from "next/link";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";

const Header = () => {
  return (
    <div className="flex justify-center">
      <div
        id={"headerContainer"}
        className="space-x-96 pt-4 flex z-10 absolute top-0 "
      >
        <Link href="user/1">
          <UserIcon />
        </Link>
        <Link href="/search">
          <SearchIcon />
        </Link>
      </div>
    </div>
  );
};

export default Header;
