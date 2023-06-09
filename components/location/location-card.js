import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectAllUserComments,
  fetchAllUserComments,
} from "@/slices/allUserCommentsSlice";
import StarRatings from "react-star-ratings";
import { supabase } from "@/lib/supabaseClient";
import CommentCard from "./comment-card";
import CommentIcon from "../icons/comment-icon";

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
  }, [ratingsFetched]);

  const getVisited = async () => {
    let count = 0;
    const { data } = await supabase
      .from("user_locations")
      .select()
      .eq("location_id", location.id)
      .eq("has_visited", true);
    data.forEach(() => {
      count++;
    });
    return count;
  };
  let url = "/haunted.png";
  const randomPic = () => {
    console.log(location.id)
    const num=location?.id[location.id.length - 1];

    console.log(num)
  if(num==0){
      url= "/haunted.png";
    }else if(num==1){
      url= "/haunted2.1.jpg";
    }else if(num==2){
      url = "/haunted3.jpg";
    }else if(num==3){
      url = "/haunted4.jpg";
    }else if(num==4){
      url = "/haunted5.webp";
    }else if(num==5){
      url = "/haunted6.jpg";
    }else if(num==6){
      url = "/haunted7.jpg";
    }else if(num==7){
      url = "/haunted8.jpg";
    }else if(num==8){
      url = "/haunted9.jpg";
    }else if(num==9){
      url = "/haunted10.jpg";
    }
    console.log(url)
    return url
  };
  randomPic()



  return (
    <div className="flex top-0 flex-col mt-5 ">
      <div className="mb-2 opacity-80 bg-slate-900 border-2 border-solid border-slate-700 rounded-lg p-2 text-left text-slate-300">
        <img
          className="m-3 mr-5 border-solid rounded-sm border-2 border-slate-400 float-left w-36"
          src={url}
          alt=""
        />
        <p className="p-1 break-words leading-5 text-left">
          {
            location?.description /*.replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, (i) =>
            i.toUpperCase()
          )*/
          }
        </p>
      </div>
      {/* MORE INFO AND RATINGS */}
      <div
        id="moreInfoContainer"
        className="flex text-purple-500 px-2  border-dashed border-2 rounded-md border-purple-500 justify-between"
      >
        <div className="flex p-1 flex-row text-left items-center">
          <h1 className="md:text-xs">Avg. Rating &nbsp;</h1>
          <h1 className="md:text-xs text-slate-300">
            ({Math.round(rating * 10) / 10})&nbsp;
          </h1>
          <StarRatings
            rating={rating}
            starRatedColor="purple"
            starDimension="18"
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
          <h1 className="md:text-xs ">{`Past Visitors`}</h1>
          <h1 className="md:text-xs text-slate-300">&nbsp;{`(${visitors})`}</h1>
        </div>
      </div>
      {/* COMMENTS */}
      <div>
        <div
          id="commentHeader"
          className="flex justify-center text-slate-500 mt-3 mb-3 text-lg"
        >
          <CommentIcon />
          <h1 className="text-orange-700 text-base">
            &nbsp;
            {`Comments (${allUserComments.length}):`}
          </h1>
        </div>
        {/* This div below I took off overflow in comments */}
        <div
          id="commentsContainer"
          className="mb-3"
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
