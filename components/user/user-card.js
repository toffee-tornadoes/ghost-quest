import { useUser } from "@supabase/auth-helpers-react";
import CommentsButton from "../ui/comments-button";
import FaveButton from "../ui/fave-button";
import VisitedButton from "../ui/visited-button";

const UserCard = ({ data }) => {
  const user = useUser();
  // console.log("user card data:", data)
  if (user) {
    return (
      <div className="flex flex-col" data={data}>
        <div className="w-full flex flex-col items-center">
          <VisitedButton
            className="w-full flex justify-center"
            link={`/user/${user.id}/visited`}
            text={"Visited Locations"}
          />
          <FaveButton
            className="w-full flex justify-center"
            link={`/user/${user.id}/favorites`}
            text={"Favorited Places"}
          />
          <CommentsButton
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
