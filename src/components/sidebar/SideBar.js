
import React, { Component } from 'react';
import './SideBar.css';
import SearchResults from '../searchresults/SearchResults';

class SideBar extends Component {



  render() {
    const{ locations, query, places, searchPlaces, markers } = this.props;
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
}

export default SideBar;