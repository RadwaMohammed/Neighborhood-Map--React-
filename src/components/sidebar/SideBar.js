
import React, { Component } from 'react';
import './SideBar.css';
import SearchResults from '../searchresults/SearchResults';

class SideBar extends Component {



  render() {
    const{ locations, query, places, searchPlaces } = this.props;
    return (
      <aside>
        <div className="search-container">
          <label htmlFor="search" className="search-label">Search for a coffee shop</label>
            <input
              type="text"
              id="search"
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
          />
        </div>
      </aside>
    )
  }
}

export default SideBar;