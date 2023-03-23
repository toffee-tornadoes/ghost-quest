// ghostquest.com/user/[id]

import UserPlacesVisitedPage from "./visited";
import Link from "next/link";
import UserCommentsPage from "./comments";
import UserFavoritesPage from "./favorites";
import { supabase } from "@/lib/supabaseClient";

  import {useUser} from '@supabase/auth-helpers-react'

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

// export const getStaticPaths = async () => {
//   const { data: user_locations } = await supabase.from("user_locations").select("location_id");

//   const paths = user_locations.map(({ location_id }) => ({
//     params: {
//       location_id: location_id.toString(),
//     },
//   }));
//   console.log(user_locations)
//   return {
//     paths,
//     fallback: false,
//   };
// };

 export const getServerSideProps = async (context) => {
  const {id}= context.params
  const { data} = await supabase
    .from("user_locations")
    .select('* ,profiles(*)')
    .eq('profile_id', id )
  return {
    props: {
      data
    },
  };
};

// User Page View
const UserPage = ({data}) => {
    // console.log(data)
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

      <UserCard data={data}/>
    </div>
  );
};

export default UserPage;
