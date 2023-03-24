import UserHeader from "./user-header";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import HomeButtonGr from "../ui/home-button-gr";
import HomeButton from "../ui/home-button";

const UserCard = ({ data }) => {
  const user = useUser();
  if(user) {
  return (
    <div className="m-4 flex flex-col" data={data}>
      <div className="w-full flex flex-col items-center">
        <Link className="w-full flex justify-center" href={`/user/${user.id}/visited`}>
          <HomeButton link={`/user/${user.id}/visited`} text={"Visited Locations"} />
        </Link>
        <Link className="w-full flex justify-center" href={`/user/${user.id}/favorites`}>
          <HomeButton link={`/user/${user.id}/favorites`} text={"Favorited Places"} />
        </Link>
        <Link className="w-full flex justify-center" href={`/user/${user.id}]/comments`}>
          <HomeButton link={`/user/${user.id}/comments`} text="Comments" />
        </Link>
      </div>
      <div>
        <Link className="w-full flex justify-center" href={`/`}>
          <HomeButtonGr text="Sign Out" />
        </Link>
      </div>
    </div>
  )
}
};

export default UserCard;
