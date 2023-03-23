import UserHeader from "./user-header";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

const UserCard = ({data}) => {
  const user =useUser()
  return (
    <div>
      <div>This is some text for the user card.</div>
      <Link href={`/user/[id]/visited`} data={data}>Places Visited:</Link>
      <Link href={`/user/[id]/favorites`}>Favorited Places:</Link>
      <Link href={`/user/[id]]/comments`}>Comments:</Link>
    </div>
  );
};

export default UserCard;
