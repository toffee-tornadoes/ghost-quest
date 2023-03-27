// ghostquest.com/user/[id]/comments

import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Fragment } from "react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data } = await supabase
    .from("comments")
    .select("*,locations(*),profiles(*)")
    .eq("profile_id", id);
  return {
    props: {
      data,
    },
  };
};
const UserCommentsPage = ({ data }) => {
  const user =useUser()
    console.log(data);


  return (<div>
    {data.map((comment)=>{
      return (
        <Fragment key={comment.locations.id}>
          <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
            <Link
              className="w-full text-base text-left text-slate-500 hover:text-purple-400"
              href={`/locations/${comment.locations.id}`}
            >
              <h2 className="flex">
                {`"${comment.locations.location}"\u00A0`}{" "}
                <div
                  id="cityState"
                  className="italic text-slate-400 text-right pr-2"
                >
                  {comment.locations.city}
                  {", "}
                  {comment.locations.state}
                </div>
              </h2>
            </Link>
          </div>
          <div className="p-6 max-w-sm mx-auto bg-purple-500 rounded-xl shadow-lg flex-col  items-center space-x-4">
            {user && (
              <Link
                className="p-6 text-lg hover:text-slate-300 "
                href={`/user/${user.id}`}
              >
                {user.email}
              </Link>
            )}
            <div className="border-solid border-2 rounded-lg mt-4 border-indigo-600">
              {comment.content}
            </div>
          </div>
        </Fragment>
      );
    })}
  </div>)
};

export default UserCommentsPage;
