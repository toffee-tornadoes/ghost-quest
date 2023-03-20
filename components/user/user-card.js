import UserHeader from "./user-header";
import Link from "next/link";

const UserCard = () => {
  return (
    <div>
      <div>This is some text for the user card.</div>
      <Link href={"/user/[id]/visited"}>Places Visited:</Link>
      <Link href={"/user/[id]/favorites"}>Favorited Places:</Link>
      <Link href={"/user/[id]/comments"}>Comments:</Link>
    </div>
  );
};

export default UserCard;
