import Categories from "./categories";

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="searchDiv" className="flex flex-col items-center">
      <form className="flex flex-col w-1/2 gap-3
    " onSubmit={handleSubmit} >
        Enter a Destination:
        <input type="text" placeholder="Search" />
      </form>
      <Categories />
    </div>
  );
};

export default SearchBar;
