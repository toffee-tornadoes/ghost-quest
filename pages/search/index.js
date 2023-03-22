import LocationListingCard from "@/components/locations/loc-listing-card";
import SearchBar from "@/components/search/search-bar";
import SearchHeader from "@/components/search/search-header";
import { supabase } from "@/lib/supabaseClient";
import { data } from "autoprefixer";
import { use, useEffect, useState } from "react";


const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

  const fetchResults = async (searchQuery) => {
    const { data } = await supabase.from('locations').select().textSearch('description', `${searchQuery}`)
    setResults(data)
    return data;
  }

  console.log(results)

  return (
    <div>
      <SearchHeader />
      <SearchBar fetchResults={fetchResults} setSearchQuery={setSearchQuery} searchQuery={searchQuery} results={results} />
      <div id="resultsContainer">
        {!results || results === null ? "" : results.map((location)=>{
          return (
            <LocationListingCard key={location.id} locations={results} />
          )
        })}
      </div>
    </div>
  );
};

export default SearchPage;
