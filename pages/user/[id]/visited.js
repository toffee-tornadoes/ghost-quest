// ghostquest.com/user/[id]/visited
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LocationListingCard from "@/components/locations/loc-listing-card";
import BackIcon from "@/components/icons/back-icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSavedLocs,
  selectUserSavedLocs,
  setVisitedLocs,
} from "@/slices/userSavedLocsSlice";

// export const getServerSideProps = async (context) => {
//   const { id } = context.params;
//   const { data } = await supabase
//     .from("user_locations")
//     .select("*,locations(*)")
//     .eq("profile_id", id)
//     .eq("has_visited", true);

//   return {
//     props: {
//       data,
//     },
//   };
// };

const UserPlacesVisitedPage = ({ data }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const savedLocs = useSelector(selectUserSavedLocs);

  useEffect(() => {
    dispatch(getUserSavedLocs(user?.id));
  }, []);
  console.log(savedLocs[0].locations)
  // let visitedLocations = [];

  // useEffect(() => {
  //   savedLocs?.filter((location) => {
  //     location?.has_visited === true && visitedLocations.push(location.locations);
  //     console.log(visitedLocations);
  //   });
  // }, [dispatch]);

  // if (savedLocs.length > 0 && savedLocs !== null) {
  //   // console.log(visitedLocations)
  //   // savedLocs?.map((location) => {
  //   //   location?.has_visited && visitedLocations.push(location)
      // return (
      //   <div>
      //     <LocationListingCard locations={savedLocs} />
      //   </div>
      // )
  //   // })
  // }


  // else {
  //   return (
  //     <>
  //       <div
  //         className="border-b-white border-b flex justify-between"
  //         id="favorites-header"
  //       >
  //         <div className="m-2 text-left text-3xl">
  //           <h1 className="w-full">Visited Locations</h1>
  //           <div className="text-slate-500 italic text-base">
  //             <h1></h1>
  //           </div>
  //         </div>
  //         <div className="p-2">
  //           <BackIcon />
  //         </div>
  //       </div>
  //       <div>
  //         <p>No Visited Locations</p>
  //       </div>
  //     </>
  //   );
  // }
};

export default UserPlacesVisitedPage;
