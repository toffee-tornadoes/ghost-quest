import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/lib/supabaseClient";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import HomeButton from "../ui/home-button";

const LoginForm = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  // console.log(session.access_token)

  const handleSignOut = () => {
    supabase.auth.signOut();
    console.log("signed out");
    router.push(`/user/${user.id}`);
  };

  if (user) {
    console.log(user);
  }
  if (!user) {
    return (
      <div className="w-full pl-14 pr-14">
        {/* <button onClick={handleSignOut}>Sign Out</button> */}
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    );
  } else {
    return (
      <button onClick={handleSignOut} className="flex justify-center top-0">
        <HomeButton link="/" text="Sign Out" />
      </button>
    );
  }
};

export default LoginForm;
