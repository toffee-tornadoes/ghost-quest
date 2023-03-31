import BackIcon from "../icons/back-icon";

const AllLocationHeader = () => {
  return (
    <div className="flex border-b border-solid justify-between mb-5" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <h1>Haunts Near You</h1>
        <p className="text-slate-500 italic text-base">Your Location</p>
        
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default AllLocationHeader;
