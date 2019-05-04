import PropTypes from 'prop-types';
import React from 'react';
import './SideBar.css';
import SearchResults from '../searchresults/SearchResults';

function SideBar(props) {
  const{ locations, query, places, searchPlaces, markers, isHidden } = props;

  function isInTabOrder(isHidden) {
    let order = isHidden ? -1 : 0 ;
    return order;
  }

  return (
    <aside aria-hidden={isHidden}>
      <div className="search-container" >
        <h2 className="search-header">
          Search for an outdoor place
        </h2>
          <input
            tabIndex={isInTabOrder(isHidden)}
            type="text"
            id="search"
            role="search"
            aria-label="Search for an outdoor place"
            placeholder="Search... "
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
          isHidden={isHidden}
          isInTabOrder={isInTabOrder}
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
  searchPlaces: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired
}

export default SideBar;