// ghostquest.com/user/[id]

import UserPlacesVisitedPage from "./visited";
import Link from "next/link";
import UserCommentsPage from "./comments";
import UserFavoritesPage from "./favorites";
import { supabase } from "@/lib/supabaseClient";

  import {useUser} from '@supabase/auth-helpers-react'
import UserEdit from "@/components/user/user-edit";

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
      const { data:profile } = await supabase.from("profiles").select().eq("id", id);
      const { data: pic } = supabase.storage
        .from("public-bucket")
        .getPublicUrl(`folder/avatar${id}.png`, {
          transform: {
            width: 20,
            height: 20,
          },
        });
      return {
        props: {
          data,
          profile,
          pic
        },
      };

};

// User Page View
const UserPage = ({data,profile,pic}) => {
    // console.log(data)
    const user = useUser()
  // Username, profile pic?, hometown
  // Places Visited component - link to visited page
  // Tagged users component - ?
  // Achievements component
  // User comments component - link ?

  return (
    <div>
      <UserHeader profile={profile} pic={pic} />
      {/* {<p>{user&&user.id}</p>} */}
      <hr />

      <UserCard />
      <UserEdit user={user} />
    </div>
  );
};

export default UserPage;
