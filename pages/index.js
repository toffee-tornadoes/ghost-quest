import Head from "next/head";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Fragment } from "react";
import Header from "@/components/header";
import HomeHeader from "@/components/home/home-header";
import HomeButton from "@/components/ui/home-button";
import HomeButtonGr from "@/components/ui/home-button-gr";
import FaveButton from "@/components/ui/fave-button";
import RandomButton from "@/components/ui/random-button";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import { selectLocations } from "@/slices/locationsSlice";
import VisitedButton from "@/components/ui/visited-button";

// HOME VIEW/ROOT

// Main Nav component - include this in Layout component
// User Icon Component - link to user-profile page
// Search Icon component - filter component
// Favorites Icon component - link to favorites page

// Displays pins of nearby locations (if there are any)

export default function Home() {
  const user = useUser();

  const clickText = "Nearby Locations";
  const favesText = "Favorites";
  const loginText = "Login or Create an Account";
  const randomText = "Random Location";

  const locations = useSelector(selectLocations);
  const randomNum = Math.ceil(Math.random() * locations.length) - 1;
  const locURL = "locations";
  const favURL = `user/${user?.id}/favorites`;
  const loginURL = `user`;
  const randomURL = `locations/${randomNum}`;

  return (
    <Fragment>
      <div className="items-center text-white flex flex-col">
        <HomeHeader />
        <hr />
        <img
          className="flex w-1/3"
          src="ghost-quest-high-resolution-logo-color-on-transparent-background (1).png"
          alt="ghost quest logo"
        />
        <HomeButton link={locURL} text={clickText} />
        {user && (
          <Fragment>
            <FaveButton link={favURL} text={favesText} />
            <VisitedButton
              className="w-full flex justify-center"
              link={`/user/${user.id}/visited`}
              text={"Visited Locations"}
            />
          </Fragment>
        )}
        <RandomButton
          link={randomURL}
          text={randomText}
          location={locations[randomNum]}
        />
      </div>
      {!user && (
        <div className="flex justify-center mb-8">
          <HomeButtonGr link={loginURL} text={loginText} />
        </div>
      )}
    </Fragment>
  );
}
