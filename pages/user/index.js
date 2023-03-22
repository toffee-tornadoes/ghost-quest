// ghostquest.com/user/
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabaseClient';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
  import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const { default: LoginForm } = require("@/components/auth/login-form");
const { default: LoginHeader } = require("@/components/auth/login-header");
const { Fragment } = require("react");

// Auth UI component - IF user is not logged in... display
// Login or Sign-in component

const UserLoginPage = () => {



  return (
    <Fragment>
      <LoginHeader />
          <div className="container" >

        <Auth supabaseClient={supabase } appearance={{ theme: ThemeSupa }} theme="dark" />

        <p>Account page will go here.</p>

    </div>
    </Fragment>
  );
};

export default UserLoginPage;
