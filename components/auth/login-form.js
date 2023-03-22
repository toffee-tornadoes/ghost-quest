import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabaseClient';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
  import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router';

const LoginForm = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router= useRouter()
  const user = useUser()

 const handleSignOut =()=>{
  supabase.auth.signOut()
  console.log('signed out')
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
    if(user){
      console.log(user)
    }
  if(!user){
    return(
      <>
      <button onClick={handleSignOut}>signOut</button>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />


    </div>

      </>
  );}
  else{
    return(
      <button onClick={handleSignOut}>signOut</button>
    )
  }
};

export default LoginForm;
