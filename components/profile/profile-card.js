import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import CommentsButton from "../ui/comments-button";
import FaveButton from "../ui/fave-button";
import VisitedButton from "../ui/visited-button";

const ProfileCard = ({ profile }) => {
  const router = useRouter();
  const profileId = router.query.id
  // if (user) {
    return (
      <div className="flex flex-col">
        <h1 className="text-2xl text-slate-300 mb-2">
        {`${profile.username}'s History:`}
        </h1>
        <div className="w-full flex flex-col items-center">
          <VisitedButton
            className="w-full flex justify-center"
            link={`/user/${profileId}/visited`}
            text={"Visited Locations"}
          />
          <FaveButton
            className="w-full flex justify-center"
            link={`/user/${profileId}/favorites`}
            text={"Favorited Places"}
          />
          <CommentsButton
            className="w-full flex justify-center"
            link={`/user/${profileId}/comments`}
            text="Comments"
          />
        </div>
      </div>
    );
  // }
};

export default ProfileCard;
