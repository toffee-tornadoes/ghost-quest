import { Fragment } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectAllUserComments,
  fetchAllUserComments,
} from "@/slices/allUserCommentsSlice";
import StarRatings from "react-star-ratings";
import { supabase } from "@/lib/supabaseClient";
import { selectLocations } from "@/slices/locationsSlice";

const LocationCard = ({ location }) => {
  const dispatch = useDispatch();
  const allUserComments = useSelector(selectAllUserComments);
  const locations = useSelector(selectLocations)
  const [comments, setComments] = useState(allUserComments);
  const [ratings, setRatings] = useState();
  const [rating, setRating] = useState();
  const [visitors, setVisitors] = useState(0);
  const [ratingsFetched, setRatingsFetched] = useState(false);
  useEffect(() => {
    dispatch(fetchAllUserComments(location.id));
  }, []);

  useEffect(() => {
    getRating(location?.id).then((result) => {
      setRatings(result);
      const avgRating = getAvg(result);
      setRating(avgRating);
    });
    setRatingsFetched(false);
  }, [ratingsFetched]);

  const getRating = async (locationId) => {
    const { data } = await supabase
      .from("locations")
      .select("rating")
      .eq("id", locationId);
    const ratings = data[0].rating;
    return ratings;
  };

  const ratingHandle = async (stars, ratings, locationId) => {
    const newRatings = ratings;
    newRatings.push(Number(stars));
    const { data } = await supabase
      .from("locations")
      .update({ rating: newRatings })
      .eq("id", locationId);
    return data;
  };

  const getAvg = (ratings) => {
    const total = ratings?.reduce((acc, cv) => {
      return acc + cv;
    }, 0);
    if (ratings?.length === 1) return total;
    else {
      const rating = total / (ratings?.length - 1);
      return rating;
    }
  };
    useEffect(() => {
      getVisited().then((result) => {
        setVisitors(result);
      });
      setRatingsFetched(false);
    }, [ratingsFetched]);

  const getVisited = async()=>{
    let count =0
    const {data}= await supabase.from('user_locations').select().eq('location_id',location.id).eq('has_visited', true)
    console.log(data)
    data.forEach(()=>{
      count++
    })
    console.log(count)
    return count
  }


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
        <h1>Ratings ({ratings?.length - 1})</h1>
        <div className="flex flex-row justify-center">
          <StarRatings
            rating={rating}
            starRatedColor="purple"
            starHoverColor="green"
            changeRating={(evt) => {
              ratingHandle(evt, ratings, location?.id);
              setRatingsFetched(true);
            }}
            numberOfStars={5}
            name="rating"
            editing={false}
          />
        </div>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Fear Factor</h1>
        <p>0-10 Ghosts</p>
      </div>
      <div className="bg-slate-800 m-5">
        <h1>Past Visitors</h1>
        <p> {visitors} People</p>
      </div>
      <div>
        <div
          className="border-b-white border-b flex justify-between"
          id="favorites-header"
        >
          <div className="m-2 text-left text-3xl">
            <h1 className="w-full">Comments</h1>
            <div className="text-slate-500 italic text-base">
              <h1>All User Comments...</h1>
            </div>
          </div>
        </div>
        <div className="overflow-auto content-center max-h-screen ">
          {allUserComments?.map((comment) => {
            if (comment.location_id == location.id) {
              return (
                <Fragment key={comment.id}>
                  <div className="flex flex-col justify-between p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 border-slate-700">
                    {comment.profiles && (
                      <div
                        className="p-6 text-lg hover:text-slate-300 "
                        href={`/user/${comment.profiles.id}`}
                      >
                        {comment.profiles.username}
                      </div>
                    )}
                    <div className="px-3 border-solid border-2 rounded-lg mt-4 text-left">
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
