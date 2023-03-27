import BackIcon from "@/components/icons/back-icon";

const FavoritesHeader = () => {
  return (
    <div
      className="border-b-white border-b flex justify-between"
      id="favorites-header"
    >
      <div className="m-2 text-left text-3xl">
        <h1 className="w-full">Favorited Locations</h1>
        <div className="text-slate-500 italic text-base">
          <h1></h1>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default FavoritesHeader;
