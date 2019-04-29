// Import axios
import axios from 'axios'
import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    locations : []
  }
  componentDidMount() {
    this.loadMapScript();
    this.getLocations();
  }

  /* initialize google Map  */
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      // location of Alexanderia city in Egypt
      center: {lat: 31.2000924, lng: 29.9187387},
      zoom: 12
    });
  }
  /* loading map script */
  loadMapScript = () => {
    window.initMap = this.initMap;
    // first script element in the document
    let index  = window.document.getElementsByTagName('script')[0];
    // create script element for google map
    let script = window.document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA2I0qEtPwrjkRVQ8BiK_FjnoWwmC4ubOY&callback=initMap';
    script.async = true;
    script.defer = true;
    // handle error on loading map
    script.onerror = function() {
      alert('Oh no, There is an error occurred during loading map!');
    };

    index.parentNode.insertBefore(script, index);
  }

  /* fetching data using axios which is a Promise based HTTP client for the browser and node.js
   * has features -Make (XMLHttpRequests) from the browser -Make (http) requests from node.js
   * https://github.com/axios/axios
   *
  */
  getLocations = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id : 'TJ4M30ICUWSOT45033WN5QMJBBA0YUOD2RBTS1RW2H4LN24F',
      client_secret: 'J30MQOQUA425OIXPCFFZDDDZLE03KADG44AZCSL0B05AWQLP',
      query: 'hotel',
      ll: '31.2000924,29.9187387',
      v: '20190429',
      limit:'15'
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        locations: response.data.response.groups[0].items
      });
    })
    .catch(error => {
        // hande error of fetching data
        alert('An error has occurred while fetching data!');
        console.log(`Error:  ${error}`);
      });
    }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>

    )
  }

}
export default App;
