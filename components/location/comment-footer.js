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
    <div>
      <h1>Comments {"(#)"}</h1>
      <form onSubmit={commentHandle}>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          value={input}
          name="comment"
          id={location.id}
          placeholder="Add your comment here..."
          className="bg-slate-800 w-3/4 h-[100px] rounded-md pl-1 pr-1 pt-1 pb-20 text-white"
        />
      </form>
    </div>
  );
};

export default CommentFooter;
