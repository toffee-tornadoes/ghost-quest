// ghostquest.com/location/[id]/comments

// Displays list of all this locations comments

import CommentFooter from "@/components/location/comment-footer";
import LocationHeader from "@/components/location/location-header";
import { supabase } from "@/lib/supabaseClient";
import { Fragment, useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
    const { data } = await supabase
      .from("comments")
      .select("*,profiles(*),locations(*)")
      .eq("location_id", id);
  return {
    props: {
      data,
    },
  };
};

const CommentsPage = ({data}) => {
   const user = useUser();
   console.log(data)
  return (
    <div className="overscroll-none">
      <LocationHeader location={data[0].locations} />

      <div className="overflow-auto w-3/4 content-center absolute max-h-100 overscroll-none ">
        {data.map((comment) => {
          return (
            <Fragment key={comment.id}>
              <div className="p-6 m-6 max-w-sm mx-auto bg-purple-500 rounded-xl shadow-lg flex-col  items-center space-x-4">
                {user && (
                  <Link
                    className="p-6 text-lg hover:text-slate-300 "
                    href={`/user/${comment.profiles.id}`}
                  >
                    {comment.profiles.username}
                  </Link>
                )}
                <div className="border-solid border-2 rounded-lg mt-4 border-indigo-600">
                  {comment.content}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <CommentFooter location={data[0]} />
      take me there button
    </div>
  );}


export default CommentsPage;
