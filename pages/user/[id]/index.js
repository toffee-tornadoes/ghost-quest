import UserPlacesVisitedPage from "./visited";
import Link from "next/link";
import UserCommentsPage from "./comments";
import UserFavoritesPage from "./favorites";
import { supabase } from "@/lib/supabaseClient";

import { useUser } from "@supabase/auth-helpers-react";
import UserEdit from "@/components/user/user-edit";

const { default: UserCard } = require("@/components/user/user-card");
const { default: UserHeader } = require("@/components/user/user-header");

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data } = await supabase
    .from("user_locations")
    .select("* ,profiles(*)")
    .eq("profile_id", id);
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", id);
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
      pic,
    },
  };
};

const UserPage = ({ data, profile, pic }) => {
  const user = useUser();

  return (
    <div>
      <UserHeader profile={profile} pic={pic} />
      <hr />
      <UserCard />
      <hr />
      <UserEdit user={user} />
    </div>
  );
};

export default UserPage;
