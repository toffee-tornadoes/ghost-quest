import BackIcon from "../icons/back-icon";
import { Fragment } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUserComments } from "@/slices/userCommentsSlice";
import StarRatings from "react-star-ratings";
import { supabase } from "@/lib/supabaseClient";

const LocationCard = ({ location  }) => {
  console.log(location)
  const userComments = useSelector(selectUserComments);
  console.log(userComments);
  const [rating, setRating] = useState(0);

    const ratingHandle = async () => {
      try {
        console.log(rating)
        const { error } = await supabase.from("locations").insert([{  rating: [rating] }]).eq('id',`${location.id}`);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex top-0 flex-col m-5 ">
      <div className="">
        <img
          className="mr-4 border border-slate-700 p-2 float-left w-36 h-36"
          src="/haunted.png"
          alt=""
        />
        <p className="text-left text-slate-300">{location?.description}</p>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Distance</h1>
        <p>Some miles idk</p>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Destination Time</h1>
        <p>Some hours</p>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Rating</h1>
        <div className="flex flex-row">
          <StarRatings
            onChange={ratingHandle()}
            rating={rating}
            starRatedColor="purple"
            starHoverColor='green'
            changeRating={setRating}
            numberOfStars={5}
            name="rating"
          />
        </div>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Fear Factor</h1>
        <p>0-10 Ghosts</p>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Past Visitors</h1>
        <p># People</p>
      </div>
      <div>
        <div className="overflow-auto content-center max-h-screen ">
          {userComments?.map((comment) => {
            if (comment.location_id == location.id) {
              return (
                <Fragment key={comment.id}>
                  <div className="p-6 m-6 max-w-sm mx-auto bg-purple-500 rounded-xl shadow-lg flex-col  items-center space-x-4 shadow-green-400">
                    {comment.profiles && (
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
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
