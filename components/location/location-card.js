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

const LocationCard = ({ location }) => {
  const dispatch = useDispatch();
  const allUserComments = useSelector(selectAllUserComments);
  const [comments, setComments] = useState(allUserComments);
  const [rating, setRating] = useState([]);
  const [stars, setStars] = useState();
  const [FetchRating, setFetchRating] = useState(false);
  useEffect(() => {
    dispatch(fetchAllUserComments(location.id));
  }, []);

    useEffect(() => {
    getRating(location.id).then((result)=>{ setRating(result);setFetchRating(false);});
  }, [FetchRating]);
  console.log(rating)



  const getRating = async (location_id) => {
    try {
      // console.log(location_id)
      const { data,error } = await supabase
        .from("locations")
        .select('rating')
        .eq("id", location_id);
        setFetchRating(true)
        return data
    } catch (error) {
      console.log(error);
    }
  };
  //  getRating(location.id).then(console.log())
  const ratingHandle =async (rating)=>{
    console.log(rating)
        try {
          const { data, error } = await supabase
            .from("locations")
            .update([{rating:rating}])
            .eq("id", `${location.id}`);
            console.log(data)
          return data;
        } catch (error) {
          console.log(error);
        }
  }
  const newRating=(stars)=>{
    console.log(stars)
    const newArr = rating
    newArr.push(stars)
    ratingHandle(newArr);
  }
  const getAve = () => {
    if (rating?.length) {
      let sum = 0;
      for (let i = 0; i < rating.length; i++) {
        sum += Number(rating[i].rating);
      }
      console.log(sum)
      return sum / rating.length;
    }
  };
  console.log()

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
            onChange={()=>newRating(stars)
            }
            rating={getAve()}
            starRatedColor="purple"
            starHoverColor="green"
            changeRating={setStars}
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
