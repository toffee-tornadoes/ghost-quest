const ConfirmUpdateButton = () => {
  return (
    <button
      className={`p-2 border-solid border-2 hover:bg-slate-900 rounded-md m-2 hover:border-green-600 hover:cursor-pointer border-green-700 justify-center`}
    >
      <p className="w-full text-base text-slate-300 hover:text-green-400">
        Confirm
      </p>
    </button>
  );
};

export default ConfirmUpdateButton;
