import PropTypes from 'prop-types';
import React from 'react';
import './SideBar.css';
import SearchResults from '../searchresults/SearchResults';

function SideBar(props) {
  const{ locations, query, places, searchPlaces, markers } = props;

  return (
    <aside>
      <div className="search-container">
        <h2 className="search-header">
          Search for an outdoor place
        </h2>
          <input
            type="text"
            id="search"
            role="search"
            aria-label="Search for an outdoor place"
            placeholder="Type here... "
            value={query}
            onChange={(event) => searchPlaces(event.target.value)}
          />
      </div>
      <div className="search-result">
        <SearchResults
          places={places}
          query={query}
          locations={locations}
          markers={markers}
        />
      </div>
    </aside>
  )
}

/* validate data types */
SideBar.propTypes = {
  locations: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  markers: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  searchPlaces: PropTypes.func.isRequired
}

export default SideBar;