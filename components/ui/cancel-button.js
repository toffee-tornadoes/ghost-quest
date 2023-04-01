const CancelButton = () => {
  return (
    <button
      className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-red-600 hover:cursor-pointer border-red-700 justify-center`}
    >
      <p className="w-full text-base text-slate-300 hover:text-red-400">
        Cancel
      </p>
    </button>
  );
};

export default CancelButton;
