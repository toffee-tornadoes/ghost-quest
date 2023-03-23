import {useUser} from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'


//     const fetchLocationIds = async () => {
//   // console.log(id)
//     let { data}  = await supabase.from('user_locations').select('location_id')
//       .eq('profile_id', `a2b03fab-3a8a-41fa-bf72-dd43f999d015`);

//   return data;
// }


// ghostquest.com/user/[id]/favorites
const UserFavoritesPage = ({data}) => {
    const user =useUser()
  console.log(data)


  //     useEffect(() => {
  //   fetchLocationIds().then((result) => {
  //     console.log(result);
  //   })
  // }, []);




    return (
        <div>This is where the user's favorites go.</div>
    )
}

export default UserFavoritesPage;
