import BackIcon from "@/components/icons/back-icon";

const CommentsHeader = () => {
  return (
    <div
      className="border-b-white border-b flex justify-between mb-5"
      id="favorites-header"
    >
      <div className="m-2 text-left text-3xl">
        <h1 className="w-full">Comments</h1>
        <div className="text-slate-500 italic text-base">
          <h1>Your Comment History...</h1>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  );
};

export default CommentsHeader;
