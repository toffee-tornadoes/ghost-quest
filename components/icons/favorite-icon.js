import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const FavoriteIcon = ({ locationId, userId }) => {
  const [fave, setFave] = useState(false);
  const [fill, setFill] = useState("none");

  const faveHandle = async () => {
    if (!fave) {
      console.log("add favorite");
      setFill("purple");
      const { data, error } = await supabase
        .from("user_locations")
        .upsert([{ location_id: locationId, profile_id: userId }]);
      setFave(!fave);
      return data;
    } else {
      console.log("delete favorite");
      setFill("none");
      const { data } = await supabase
        .from("user_locations")
        .delete()
        .match({ location_id: locationId, profile_id: userId });
      setFave(!fave);
      return data;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onClick={faveHandle}
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="purple"
      className="w-6 h-6 hover:fill-purple-800 hover:stroke-purple-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
};

export default FavoriteIcon;
