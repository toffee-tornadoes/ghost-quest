// import BackIcon from "../icons/back-icon";

const HomeHeader = () => {
  return (
    <div className="flex justify-between" id="locListingHeader">
      <div className="m-2 text-left text-3xl">
        <h1>WELCOME TO GHOST QUEST</h1>
        <div className="text-slate-500 italic text-base">
          <h1>
            Your adventure starts here...
          </h1>
        </div>
      </div>
      {/* <div className="p-2">
        <BackIcon />
      </div> */}
    </div>
  );
};

export default HomeHeader;
