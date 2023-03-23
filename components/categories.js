const Categories = () => {
  return (
    <div id="categories" className="justify-center ml-3 mt-4 w-1/2 grid">
      <div className="flex justify-around">
        <button className="bg-yellow-400 w-32 m-1 p-1 pl-4 pr-4 text-gray-700 hover:text-white rounded-md text-center
        ">Favorites</button>
        <button className="bg-yellow-400 w-32 m-1 p-1 pl-4 pr-4 text-gray-700 hover:text-white rounded-md text-center
        ">Fear Factor</button>
      </div>
      <div className="flex justify-around">
        <button className="bg-yellow-400 w-32 m-1 p-1 pl-4 pr-4 text-gray-700 hover:text-white rounded-md text-center
        ">Rating</button>
        <button className="bg-yellow-400 w-32 m-1 p-1 pl-4 pr-4 text-gray-700 hover:text-white rounded-md text-center
        ">Distance</button>
      </div>
      <button className="bg-green-400 m-1 p-1 pl-4 pr-4 text-gray-700 hover:text-white rounded-md text-center
        ">Random Destination!</button>
    </div>
  );
};

export default Categories;
