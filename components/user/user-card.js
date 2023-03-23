import UserHeader from "./user-header";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

const UserCard = ({data}) => {
  const user =useUser()
  if(data){ console.log(data)}
  if(user){
  return (
    <div>
      <div>This is some text for the user card.</div>
      <Link href={`/user/${user.id}/visited`} >Places Visited:</Link>
      <Link href={`/user/${user.id}/favorites`} >Favorited Places:</Link>
      <Link href={`/user/${user.id}/comments`}>Comments:</Link>
    </div>
  );}
};

export default UserCard;
