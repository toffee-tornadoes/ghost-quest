// ghostquest.com/location/[id]/comments

// Displays list of all this locations comments

import CommentFooter from "@/components/location/comment-footer";
import LocationHeader from "@/components/location/location-header";

const CommentsPage = () => {
  return (
    <div>
      <LocationHeader/>
      {/* comment list ele */}
      <CommentFooter/>
      take me there button
    </div>
  )
}

export default CommentsPage;
