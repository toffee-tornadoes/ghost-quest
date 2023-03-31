import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";

const Header = ({ clickHandler, navUp }) => {
  const user = useUser();

  return (
    <div id="headerDiv" className="flex-row">
      <div
        id={"headerContainer"}
        className="pl-3 pt-3 flex justify-between z-10 top-0 fixed"
      >
        <div>
          <Link
            onClick={!navUp && clickHandler}
            href={user ? `/user/${user?.id}` : "/user"}
          >
            <UserIcon />
          </Link>
          <Link onClick={!navUp && clickHandler} href="/search">
            <SearchIcon />
          </Link>
        </div>
      </div>
      <div className="flex pr-3 pt-3 z-10 fixed justify-end top-0 right-0">
        <Link onClick={!navUp && clickHandler} href="/">
          <img
            className="hover:scale-110 top-0 right-0"
            src="/ghost-quest-website-favicon-color.png"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
