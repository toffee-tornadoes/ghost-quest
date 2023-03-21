import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabaseClient';

const LoginForm = () => {
  return (
    // if no account

    // <form action="">
    //   <input type="text" placeholder="Username" />
    //   <input type="text" placeholder="Email" />
    //   <section>
    //     <input type="text" placeholder="City" />
    //     <input type="text" placeholder="State" />
    //   </section>
    //   <input type="text" placeholder="Password" />
    // </form>

    // else sign in
    <>
      <Auth supabaseClient={supabase} />
    </>
  );
};

export default LoginForm;
