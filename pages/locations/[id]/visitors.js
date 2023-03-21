// ghostquest.com/location/[id]/visitors

// Displays list of past users who've visited this location


import CommentFooter from "@/components/location/comment-footer";
import LocationHeader from "@/components/location/location-header";

const VisitorsPage = () => {
  return (
    <div>
      <LocationHeader/>
      {/* visitors list ele */}
      <CommentFooter/>
      take me there button
    </div>
  )
}

export default VisitorsPage;
