import { useState } from "react";

const SearchBar = ({ fetchResults, setLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchResults(input);
    setInput("");
  };

  return (
    <>
      <div id="searchDiv" className="pt-4 flex-row">
        <form
          id="search"
          className="m-1 gap-3 flex justify-center"
          onSubmit={handleSubmit}
          action="submit"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            className="text-slate-400 w-1/2 pl-2 rounded-md bg-slate-800 flex-row"
            value={input}
            type="text"
            placeholder="Search"
          />
          <button
            className="flex flex-row justify-between pl-2 pr-2 border-solid border-2 hover:bg-slate-900 rounded-md border-purple-600 text-purple-600 hover:cursor-pointer hover:border-green-600 hover:text-green-600"
            type="submit"
          >
            Search
          </button>
          <button
            onClick={() => {
              fetchResults("");
            }}
            className="flex flex-row justify-between pl-2 pr-2 border-solid border-2 hover:bg-slate-900 rounded-md border-slate-600 text-slate-600 hover:cursor-pointer hover:border-red-600 hover:text-red-600"
            type="submit"
          >
            Clear
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
