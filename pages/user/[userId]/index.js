// ghostquest.com/user/[id]

import UserPlacesVisitedPage from "./visited";
import Link from "next/link";
import UserCommentsPage from "./comments";
import UserFavoritesPage from "./favorites";

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

// User Page View
const UserPage = () => {
  // Username, profile pic?, hometown
  // Places Visited component - link to visited page
  // Tagged users component - ?
  // Achievements component
  // User comments component - link ?
  return (
    <div>
      <UserHeader />
      <UserCard />
    </div>
  );
};

export default UserPage;
