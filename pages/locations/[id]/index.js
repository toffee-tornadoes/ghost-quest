// // ghostquest.com/location/[id]
// This is the single location view

import CommentFooter from "@/components/location/comment-footer";
import LocationCard from "@/components/location/location-card";
import LocationHeader from "@/components/location/location-header";
import { useRouter } from "next/router";

const LocationPage = () => {
  const router = useRouter();
  const location = router.query;

  // the props being passed to LocationCard and CommentFooter may change

  return (
    <div>
      <LocationHeader location={location} />
      <hr />
      <LocationCard location={location} />
      <hr />
      <CommentFooter location={location} />
      <button className="my-5 bg-cyan-900">Let's Hunt!</button>
    </div>
  );
};

export default LocationPage;
