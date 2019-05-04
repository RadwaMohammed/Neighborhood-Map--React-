import PropTypes from 'prop-types';
import React from 'react';
import './SearchResults.css';

function SearchResults(props) {
  const { locations, query, places, markers, isHidden, isInTabOrder} = props;
  const list = ( places.length > 0) ? places : locations;
  // add click event to marker tht it's name is clicked in the searched list
  function triggerMarker(placeName) {
    markers.forEach((marker) => {
      if(marker.title === placeName) {
        window.google.maps.event.trigger(marker, 'click');
      }
    });
  }

  return (
    <div className="result-container">
      { // check for the result places list
        (places.length === 0 && query.length > 0)
        ?(  // there is no result
            <p className="no-result">
              There is no place with that name!!
            </p>
          )
        :(
          <ul>
            { // display the list of searched places
              list.map((listItem, index) => {
                return (
                  <li key={index}>
                    <button
                      tabIndex={isInTabOrder(isHidden)}
                      className="place"
                      onClick={() => triggerMarker(listItem.venue.name)}
                      arial-label={`click to go to loction of ${listItem.venue.name}`}
                    >
                      {listItem.venue.name}
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}

/* validate data types */
SearchResults.propTypes = {
  locations: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
  markers: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isInTabOrder: PropTypes.func.isRequired
}

export default SearchResults;