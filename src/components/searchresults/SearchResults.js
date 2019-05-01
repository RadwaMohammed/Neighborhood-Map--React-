import React, { Component } from 'react';
import './SearchResults.css';

class SearchResults extends Component {

  render() {
    const { locations, query, places } = this.props;
    const list = ( places.length > 0) ? places : locations;
    return (
      <div>
        {
          (places.length === 0 && query.length > 0)
          ?(
              <p className="no-result">
                There is no coffee shop with that name!!
              </p>
            )
          :(
            <ul>
              {list.map((listItem, index) => {
                return (
                  <li key={index} className="place">
                    {listItem.venue.name}

                  </li>
                )
              }

              )}
            </ul>
          )
        }
      </div>
    )
  }
}

export default SearchResults;


