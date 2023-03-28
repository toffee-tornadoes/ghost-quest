import UserHeader from "./user-header";
import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import HomeButtonGr from "../ui/home-button-gr";
import HomeButton from "../ui/home-button";
import { supabase } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetUserComments } from "@/slices/userCommentsSlice";
import { resetUserLocation } from "@/slices/userLocationSlice";
import { resetUserSavedLocs } from "@/slices/userSavedLocsSlice";

const UserCard = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = useSupabaseClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
    dispatch(resetUserLocation());
    dispatch(resetUserComments());
    dispatch(resetUserSavedLocs());
    console.log("signed out");
    router.push(`/`);
  };

  const user = useUser();
  if (user) {
    return (
      <div className="m-4 flex flex-col" data={data}>
        <div className="w-full flex flex-col items-center">
          <Link
            className="w-full flex justify-center"
            href={`/user/${user.id}/visited`}
          >
            <HomeButton
              link={`/user/${user.id}/visited`}
              text={"Visited Locations"}
            />
          </Link>
          <Link
            className="w-full flex justify-center"
            href={`/user/${user.id}/favorites`}
          >
            <HomeButton
              link={`/user/${user.id}/favorites`}
              text={"Favorited Places"}
            />
          </Link>
          <Link
            className="w-full flex justify-center"
            href={`/user/${user.id}]/comments`}
          >
            <HomeButton link={`/user/${user.id}/comments`} text="Comments" />
          </Link>
        </div>
        <div>
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center"
          >
            <HomeButtonGr link="" text="Sign Out" />
          </button>
        </div>
      </div>
    );
  }
};

export default UserCard;
