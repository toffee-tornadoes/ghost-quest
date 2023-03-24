import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useState } from "react";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";

const Header = ({ clickHandler, navUp }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = useUser();

  user && setIsLoggedIn(true);
  // console.log(isLoggedIn)
  // console.log(user)

  // if (user) {
  //   console.log(user);
  // }

  return (
    <div id="headerDiv" className="flex-row w-full">
      <div
        id={"headerContainer"}
        className="p-5 w-full flex justify-between z-10 top-0 fixed"
      >
        <div className="overflow-hidden">
        <Link onClick={!navUp && clickHandler} href={`/user/${user && user.id}`}>
          <UserIcon />
        </Link>
        <Link onClick={!navUp && clickHandler} href="/search">
          <SearchIcon />
        </Link>
        </div>
        <Link onClick={!navUp && clickHandler} href="/">
          <img className="top-0 right-0" src="/ghost-quest-website-favicon-color.png" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
