// import BackIcon from "../icons/back-icon";

const HomeHeader = () => {
  return (
    <div className="flex justify-between" id="homeHeader">
      <div className="mb-3 text-left">
        <h1 className="text-3xl">WELCOME TO GHOST QUEST</h1>
        <div className="text-slate-500 italic text-base">
          {/* <h1>Your adventure starts here...</h1> */}
          <h1>Find your frights...</h1>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
