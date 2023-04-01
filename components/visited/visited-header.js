import BackIcon from "../icons/back-icon";

const VisitedHeader = ({profile}) => {
  return (
    <div className="flex border-b justify-between mb-5" id="searchHeader">
      <div className="m-2 text-left text-3xl">
        <h1>Visited Locations</h1>
        <div className="text-slate-500 italic text-base">
          <h1>
            Places you've haunted...
          </h1>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default VisitedHeader;
