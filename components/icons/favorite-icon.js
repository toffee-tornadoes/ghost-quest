import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const FavoriteIcon = ({
  locationId,
  userId,
  color,
  setFavStatus,
  favStatus,
}) => {
  const [fill, setFill] = useState(color.color);
  const [fave, setFave] = useState(color.status);

  const faveHandle = async () => {
    const { data } = await supabase
      .from("user_locations")
      .select("id")
      .match({ location_id: locationId, profile_id: userId });
    if (data.length === 0) {
      console.log("add favorite");
      setFill("purple");
      const { data, error } = await supabase
        .from("user_locations")
        .upsert([
          { location_id: locationId, profile_id: userId, is_favorited: true },
        ]);
      setFave(!fave);
      setFavStatus(!favStatus);
      return data;
    } else if (data.length === 1 && !fave) {
      console.log("update favorite");
      setFill("purple");
      const { data, error } = await supabase
        .from("user_locations")
        .update([{ is_favorited: true }])
        .match({ location_id: locationId, profile_id: userId });
      setFave(!fave);
      setFavStatus(!favStatus);
      return data;
    } else {
      console.log("delete favorite");
      setFill("none");
      const { data } = await supabase
        .from("user_locations")
        .update([{ is_favorited: false }])
        .match({ location_id: locationId, profile_id: userId });
      setFave(!fave);
      setFavStatus(!favStatus);
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
