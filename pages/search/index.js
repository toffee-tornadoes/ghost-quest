import LocationListingCard from "@/components/locations/loc-listing-card";
import SearchBar from "@/components/search/search-bar";
import SearchHeader from "@/components/search/search-header";
import { supabase } from "@/lib/supabaseClient";
import { data } from "autoprefixer";
import { use, useEffect, useState } from "react";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [currSearch, setCurrSearch] = useState(null);

  const fetchResults = async (searchQuery) => {
    const { data, error } = await supabase
      .from("locations")
      .select()
      .textSearch("description", `${searchQuery.split(" ").join(" & ")}`);
    setResults(data);
    setCurrSearch(searchQuery);
    return data;
  };

  return (
    <div>
      <SearchHeader />
      <hr />
      <SearchBar fetchResults={fetchResults} results={results} />
      {currSearch !== null && (
        <>
          <p className="text-orange-600 border-orange-600 border-b-2 m-2">
            {`Showing ${results.length} results for '${currSearch}'`}
          </p>
        </>
      )}
      {/* {results.length === 0 && (
        <>
          <p className="text-orange-600 border-orange-600 border-b-2 m-2">
            {`No results for '${currSearch}'`}
          </p>
        </>
      )} */}
      <div id="resultsContainer">
        <LocationListingCard key={location.id} locations={results} />
      </div>
    </div>
  );
};

export default SearchPage;
