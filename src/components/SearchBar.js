import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  // Sync state with URL query parameter
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent function (handleSearch in App.jsx) with the current query
    onSearch(query);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a book or subject..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
