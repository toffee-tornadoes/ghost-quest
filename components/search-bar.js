const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} action="">
      <input type="text" placeholder="Search" />
    </form>
  );
};

export default SearchBar;
