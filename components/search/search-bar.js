import { useState } from "react";
import Categories from "../categories";

const SearchBar = ({ fetchResults }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults(input);
  };

  return (
    <div id="searchDiv" className="flex flex-col items-center">
      <form
        id="search"
        className="flex flex-col w-1/2 gap-3
    "
        onSubmit={handleSubmit}
        action="submit"
      >
        {/* <button type="submit">Enter Search</button> */}
        <input
          onChange={(e) => setInput(e.target.value)}
          className="text-black"
          value={input}
          type="text"
          placeholder="Search"
        />
      </form>
      <Categories />
    </div>
  );
};

export default SearchBar;
