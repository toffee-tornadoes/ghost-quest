// ghostquest.com/user/[id]/comments

import { supabase } from "@/lib/supabaseClient";

export const getServerSideProps = async (context) => {
  const { data } = await supabase.from("comments").select();
  return {
    props: {
      data,
    },
  };
};
const UserCommentsPage = ({ data }) => {
  {
    console.log(data);
  }
  return <div>This is where user comments go.</div>;
};

export default UserCommentsPage;
