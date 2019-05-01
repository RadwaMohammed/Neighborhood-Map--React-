import escapeRegExp from 'escape-string-regexp';
import React, { Component } from 'react';
import './SideBar.css';
import SearchResults from '../searchresults/SearchResults';

class SideBar extends Component {

  state = {
    query: '',
    places: []
  }
  searchPlaces = (query) => {
    const allPlaces = this.props.locations;
    let searchedResults;
    this.setState({ query: query }, ()=>{
      if(query && query.length > 0) {
        const match = new RegExp(escapeRegExp(query), 'i')
        searchedResults = this.props.locations.filter((location) => match.test(location.venue.name));
        this.setState({places: searchedResults});
      } else {
        this.setState({places: allPlaces});
      }

    })
  }



  render() {
    const{ query, places } = this.state;
    const{ markers, locations } = this.props;
    return (
      <aside>
        <div className="search-container">
          <label htmlFor="search" className="search-label">Search for a coffee shop</label>
            <input
              type="text"
              id="search"
              placeholder="Type here... "
              value={query}
              onChange={(event) => this.searchPlaces(event.target.value)}
            />
        </div>
        <div className="search-result">
          <SearchResults
            places={places}
            query={query}
            markers={markers}
            locations={locations}
          />
        </div>
      </aside>
    )
  }
}

export default SideBar;