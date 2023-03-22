import { useState } from "react";
import Categories from "../categories";

const SearchBar = ({ fetchResults }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults(input);
    setInput("");
  };

  return (
    <>
      <div id="searchDiv" className="pt-4 flex-row">
        <form
          id="search"
          className="gap-3 flex justify-start"
          onSubmit={handleSubmit}
          action="submit"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            className="text-slate-400 pl-2 rounded-md bg-slate-800 flex-row"
            value={input}
            type="text"
            placeholder="Search"
          />
          <button className="flex flex-row justify-between pl-2 pr-2 border-solid border-2 hover:bg-slate-900 rounded-md border-purple-600 hover:cursor-pointer hover:border-green-700 hover:text-green-700" type="submit">Search</button>
        </form>
      </div>
      <div>
        <Categories />
      </div>
    </>
  );
};

export default SearchBar;
