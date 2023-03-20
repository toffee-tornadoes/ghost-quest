// // ghostquest.com/location/[id]
// This is the single location view

import CommentFooter from "@/components/location/comment-footer";
import LocationCard from "@/components/location/location-card";
import LocationHeader from "@/components/location/location-header";


const LocationPage = () => {
  //use state 'camment'
  return (
    <div>
      <LocationHeader/>
      <LocationCard/>
      <CommentFooter/>
      take me there button
    </div>
  )
}

export default LocationPage;
