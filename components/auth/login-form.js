import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  if (!user) {
    return (
      <div className="text-lg">
        <div className="w-full pl-14 pr-14">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["github", "discord", "google"]}
          />
        </div>
      </div>
    );
  } else {
    router.push(`/`);
  }
};

export default LoginForm;
