import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import SearchIcon from "./icons/search-icon";
import UserIcon from "./icons/user-icon";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ clickHandler, navUp }) => {
  const user = useUser();

  return (
    <div id="headerDiv" className="flex-row">
      <div
        id={"headerContainer"}
        className="ml-3 mt-3 flex justify-between z-10 top-0 fixed"
      >
        <div className="md:flex md:gap-1">
          <Link onClick={clickHandler} href="/">
            <FontAwesomeIcon
              icon={faGhost}
              style={{ color: "#a3a3a3" }}
              className="md:block hidden hover:scale-110 text-4xl top-0 right-0 w-10"
            />
            {/* <img
            className="md:block hidden hover:scale-110 top-0 right-0 w-10"
            src="/ghost-rating icon.png"
          /> */}
          </Link>
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
      <div className="md:hidden flex m-4 z-10 fixed justify-end top-0 right-0">
        <Link onClick={!navUp && clickHandler} href="/">
        <FontAwesomeIcon
              icon={faGhost}
              style={{ color: "#a3a3a3" }}
              className="md:hidden hover:scale-110 text-5xl top-0 right-0"
            />
          {/* <img
            className="hover:scale-110 top-0 right-0 w-12"
            src="/ghost-rating icon.png"
          /> */}
        </Link>
      </div>
    </div>
  );
};

export default Header;
