// ghostquest.com/user/[id]/comments

import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectUserComments } from "@/slices/userCommentsSlice";
import { useEffect, useState } from "react";

const UserCommentsPage = () => {
  const userComments = useSelector(selectUserComments);
  const [locs, setLocs] = useState([]);

  useEffect(() => {
    let current = 0;
    let idx = 0;
    const commentedLocs = [];
    while (current < userComments?.length) {
      if (current === 0) {
        const loc = {
          profile: {
            id: userComments[current]?.profiles?.id,
            username: userComments[current]?.profiles?.username,
          },
          loc: userComments[current]?.locations,
          comments: [userComments[current]?.content],
        };
        commentedLocs.push(loc);
        current++;
      } else if (
        userComments[current]?.locations?.location ===
        commentedLocs[idx]?.loc?.location
      ) {
        commentedLocs[idx]?.comments.push(userComments[current].content);
        idx = 0;
        current++;
      } else if (
        userComments[current]?.locations?.location !==
          commentedLocs[idx]?.loc?.location &&
        current === idx
      ) {
        const loc = {
          profile: {
            id: userComments[current]?.profiles?.id,
            username: userComments[current]?.profiles?.username,
          },
          loc: userComments[current]?.locations,
          comments: [userComments[current]?.content],
        };
        commentedLocs.push(loc);
        idx = 0;
        current++;
      } else {
        idx++;
      }
    }
    setLocs(commentedLocs);
  }, [userComments]);

  console.log(locs);

  return (
    <div>
      {locs?.map((loc) => {
        return (
          <Fragment key={loc.loc.id}>
            <div className="flex flex-row justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-purple-600 hover:cursor-pointer border-slate-700">
              <Link
                className="w-full text-base text-left text-slate-500 hover:text-purple-400"
                href={{
                  pathname: `/locations/${loc.loc.id}`,
                  query: loc.loc,
                }}
              >
                <h2 className="flex">
                  {`"${loc.loc.location}"\u00A0`}{" "}
                  <div
                    id="cityState"
                    className="italic text-slate-400 text-right pr-2"
                  >
                    {loc.loc.city}
                    {", "}
                    {loc.loc.state}
                  </div>
                </h2>
              </Link>
            </div>
            <div className="p-6 max-w-sm mx-auto bg-purple-500 rounded-xl shadow-lg flex-col  items-center space-x-4">
              {loc.comments.map((comment) => {
                if (comment)
                  return (
                    <div className="border-solid border-2 rounded-lg mt-4 border-indigo-600">
                      {comment}
                    </div>
                  );
                return (
                  <div className="border-solid border-2 rounded-lg mt-4 border-indigo-600">
                    {"loading..."}
                    {comment?.content}
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default UserCommentsPage;
