import {useUser} from '@supabase/auth-helpers-react'
const UserHeader = () => {
    const user =useUser()
    return (
        <div>{<p>{user&&user.email}</p>}</div>
    )

}

export default UserHeader;
