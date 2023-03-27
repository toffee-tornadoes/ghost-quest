import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";

const CommentFooter = ({ location }) => {
  const [input, setInput] = useState("");
  const [comment, setComment] = useState("");
  const user = useUser();

  const commentHandle = async (e) => {
    e.preventDefault();
    setComment(input);
    setInput("");
    try {
      const { data, error } = await supabase
        .from("comments")
        .upsert([
          {
            content: input,
            profile_id: `${user.id}`,
            location_id: `${location.id}`,
          },
        ]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(input);
  console.log(comment);

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
