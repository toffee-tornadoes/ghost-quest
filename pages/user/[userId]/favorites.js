import {useUser} from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'

// const fetchLocationIds = async (user) => {
//     console.log(user.id)
//     const{location_id} = await supabase
//         .from('user_locations')
//         .select('location_id','is_favorited')
//         .eq('profile_id', `${user.id}`);
//         console.log(location_id)
//   return location_id;
// }

// ghostquest.com/user/[id]/favorites
const UserFavoritesPage = () => {
    const user =useUser()
    // const id =user.id
    // console.log(user.id)
  //     useEffect(() => {
  //   fetchLocationIds(user).then((result) => {
  //     console.log(result);
  //   })
  // }, []);




    return (
        <div>This is where the user's favorites go.</div>
    )
}

export default UserFavoritesPage;
