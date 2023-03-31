import LocationListingCard from "@/components/locations/loc-listing-card";
import SearchBar from "@/components/search/search-bar";
import SearchHeader from "@/components/search/search-header";
import { supabase } from "@/lib/supabaseClient";
import { data } from "autoprefixer";
import { Fragment, use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [currSearch, setCurrSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState("");

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    if (loading) {
      setHidden("hidden");
    }
    const { data, error } = await supabase
      .from("locations")
      .select()
      .textSearch("description", `${searchQuery.split(" ").join(" & ")}`);
    setResults(data);
    setCurrSearch(searchQuery);
    setLoading(false);
    setHidden("");
    console.log(hidden);
    return data;
  };

  return (
    <div>
      {/*  */}
      <SearchHeader />
      <SearchBar
        setLoading={setLoading}
        fetchResults={fetchResults}
        results={results}
      />
      {loading ? (
        <div className="pt-2 text-slate-500">
          Loading your results...
          <br />
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl mt-3"
            spinPulse
          />
        </div>
      ) : (
        currSearch && (
          <Fragment>
            <p className={`text-orange-600 border-orange-600  border-b-2 m-2`}>
              {`Showing ${results.length} results for '${currSearch}'`}
            </p>
          </Fragment>
        )
      )}
      <div className={`${hidden}`} id="resultsContainer">
        <LocationListingCard key={location.id} locations={results} />
      </div>
    </div>
  );
};

export default SearchPage;
