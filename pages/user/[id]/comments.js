// ghostquest.com/user/[id]/comments
import { supabase } from "@/lib/supabaseClient";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data } = await supabase
    .from("comments")
    .select('*')
    .eq("profile_id", id)

  return {
    props: {
      data,
    },
  };
};

const UserCommentsPage = ({data}) => {
    if (data){
    console.log(data)
        return <div>This is where user comments go.</div>;
    }

}

export default UserCommentsPage;
