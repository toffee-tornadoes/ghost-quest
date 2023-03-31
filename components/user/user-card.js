import { useUser } from "@supabase/auth-helpers-react";
import HomeButton from "../ui/home-button";

const UserCard = ({ data }) => {
  const user = useUser();
  if (user) {
    return (
      <div className="flex flex-col" data={data}>
        <div className="w-full flex flex-col items-center">
          <HomeButton
            className="w-full flex justify-center"
            link={`/user/${user.id}/visited`}
            text={"Visited Locations"}
          />
          <HomeButton
            className="w-full flex justify-center"
            link={`/user/${user.id}/favorites`}
            text={"Favorited Places"}
          />
          <HomeButton
            className="w-full flex justify-center"
            link={`/user/${user.id}/comments`}
            text="Comments"
          />
        </div>
      </div>
    );
  }
};

export default UserCard;
