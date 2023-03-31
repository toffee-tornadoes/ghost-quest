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
import CommentCard from "./comment-card";

const LocationCard = ({ location }) => {
  const dispatch = useDispatch();
  const allUserComments = useSelector(selectAllUserComments);
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
    }, []);

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
      <div className="mb-2 opacity-80 bg-slate-900 border-2 border-solid border-slate-700 rounded-lg p-2 text-left text-slate-300">
        <img
          className="m-3 mr-5 border-solid rounded-sm border-2 border-slate-400 float-left w-36"
          src="/haunted.png"
          alt=""
        />
        <p className="p-1">{location?.description}</p>
      </div>
{/* MORE INFO AND RATINGS */}
      <div
        id="moreInfoContainer"
        className="flex text-purple-500 px-2 m-2 border-dashed border-2 rounded-md border-purple-500 justify-between"
      >
        <div className="flex p-1 flex-row justify-center">
          <h1>Rating:({ratings?.length - 1})&nbsp;</h1>
          <StarRatings
            rating={rating}
            starRatedColor="purple"
            starDimension="24"
            starSpacing=""
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
        <div className="flex items-center p-1">
          <h1>{`Past Visitors(${visitors} )`}</h1>
        </div>
      </div>
{/* COMMENTS */}
      <div>
        <div id="commentHeader" className="text-slate-500 text-lg">
          <h1 className="text-orange-700 text-base">{`Comments (${allUserComments.length}):`}</h1>
        </div>
        <div
          id="commentsContainer"
          className="overflow-auto content-center max-h-screen "
        >
          {allUserComments?.map((comment) => {
            if (comment.location_id == location.id) {
              return <CommentCard comment={comment} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
