import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabaseClient';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
  import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const LoginForm = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })
  }


    async function signUp(){
    const { data, error } = await supabase.auth.signUp(
      {
        email: 'example@email.com',
        password: 'example-password',

      }
    )
    }

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

    return(
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <p>Account page will go here.</p>
      )}
    </div>
  );
};

export default LoginForm;
