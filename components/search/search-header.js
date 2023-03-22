import BackIcon from "../icons/back-icon";

const SearchHeader = () => {
  return (
    <div className="flex justify-between" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <h1>Search</h1>
        <div className="text-slate-500 italic text-base">
          <h1>
            Enter you creapy queries below...
          </h1>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default SearchHeader;
