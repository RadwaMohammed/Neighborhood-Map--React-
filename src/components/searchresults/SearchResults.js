import React, { Component } from 'react';
import './SearchResults.css';

class SearchResults extends Component {
  triggerMarker = (placeName) =>{
    this.props.markers.forEach((marker) => {
      if(marker.title === placeName) {
        window.google.maps.event.trigger(marker, 'click');
      }
    });
  }
  render() {
    const { locations, query, places} = this.props;
    const list = ( places.length > 0) ? places : locations;

    return (
      <div className="result-container">
        {
          (places.length === 0 && query.length > 0)
          ?(
              <p className="no-result">
                There is no place with that name!!
              </p>
            )
          :(
            <ul>
              {list.map((listItem, index) => {
                return (
                  <li
                    key={index}
                    className="place"
                    onClick={() => this.triggerMarker(listItem.venue.name)}
                  >
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


