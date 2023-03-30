import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUserComments } from "@/slices/allUserCommentsSlice";
import HomeButtonGr from "../ui/home-button-gr";

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
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          value={input}
          name="comment"
          id={location.id}
          placeholder="Add your comment here..."
          className="bg-slate-800 hover:bg-slate-600 w-full rounded-md pl-2 pt-1 pb-20 text-white"
        />
        <button className="w-full flex justify-center" type="submit">
          <HomeButtonGr text={"Submit Your Comment"} />
        </button>
      </form>
    </div>
  );
};

export default CommentFooter;
