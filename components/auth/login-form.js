import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabaseClient';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
  import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';

const LoginForm = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router= useRouter()

 const handleSignOut =()=>{
  supabase.auth.signOut
  router.push('/')
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
      <>
      <button onClick={handleSignOut}>signOut</button>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>

        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />


    </div>

      </>
  );
};

export default LoginForm;
