// ghostquest.com/user/[id]

import UserPlacesVisitedPage from "./visited";
import Link from "next/link";
import UserCommentsPage from "./comments";
import UserFavoritesPage from "./favorites";

  import {useUser} from '@supabase/auth-helpers-react'

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

// User Page View
const UserPage = () => {
    const user = useUser()
    if(user){console.log(user.id)}
  // Username, profile pic?, hometown
  // Places Visited component - link to visited page
  // Tagged users component - ?
  // Achievements component
  // User comments component - link ?

  return (
    <div>
      <UserHeader />
      {<p>{user&&user.id}</p>}

      <UserCard />
    </div>
  );
};

export default UserPage;
