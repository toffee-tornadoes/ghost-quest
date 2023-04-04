import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUserComments } from "@/slices/allUserCommentsSlice";

const CommentFooter = ({ location }) => {
  const [input, setInput] = useState("");
  const [comment, setComment] = useState("");
  const [commented, setCommented] = useState(false);
  const user = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserComments(location?.id));
    setCommented(false);
  }, [commented]);

  const commentHandle = async (e) => {
    e.preventDefault();
    setComment(input);
    setInput("");
    try {
      const { data, error } = await supabase.from("comments").upsert([
        {
          content: input,
          profile_id: `${user.id}`,
          location_id: `${location.id}`,
        },
      ]);
      setCommented(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form
        className="flex flex-col items-center w-full mx-7"
        onSubmit={commentHandle}
      >
        <textarea
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          value={input}
          name="comment"
          id={location.id}
          placeholder="Add your comment here..."
          className="bg-slate-800 border border-solid border-slate-300 italic hover:bg-slate-600 w-full wrap rounded-md pl-2 pt-1 h-20 text-white"
        />
        <button
          className={`w-1/2 md:w-3/4 flex flex-row p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-green-600 hover:cursor-pointer border-green-700`}
          type="submit"
        >
          <div className="w-full text-base text-slate-300 hover:text-green-400">
            <h2 className="text-center text-sm md:text-xs lg:text-sm">Submit a Comment</h2>
          </div>
        </button>
      </form>
    </div>
  );
};

export default CommentFooter;
