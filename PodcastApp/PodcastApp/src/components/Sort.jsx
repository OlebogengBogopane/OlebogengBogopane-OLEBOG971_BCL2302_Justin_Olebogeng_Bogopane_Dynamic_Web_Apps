
import React, { useState } from 'react';
const genreTitleMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};
const SearchSort = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
  const [sortState, setSortState] = useState(sortBy);
  const sortShows = (criteria) => {
    setSortState(criteria);
    handleSortChange(criteria);
  };
  return (
    <div className="search-sort-container">
      <input type="text" placeholder=":mag:Search shows" value={searchQuery} onChange={handleSearchChange} />
      <select id="sortDropdown" value={sortState} onChange={(e) => sortShows(e.target.value)}>
        <option value="default" disabled>
          Select an option
        </option>
        <option value="titleAZ">Title A-Z</option>
        <option value="titleZA">Title Z-A</option>
        <option value="dateUpdatedAscending">Date Updated (Ascending)</option>
        <option value="dateUpdatedDescending">Date Updated (Descending)</option>
      </select>
    </div>
  );
};
export default SearchSort;