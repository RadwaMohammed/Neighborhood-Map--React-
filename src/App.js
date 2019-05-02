// Import axios
import axios from 'axios'
import React from 'react';
import './App.css';
// import components
import MyMap from './components/mymap/MyMap';
import SideBar from './components/sidebar/SideBar';
import Header from './components/header/Header';


class App extends React.Component {
  state = {
    locations : [],
    markers: []
  }
  componentDidMount() {
    this.getLocations();
  }

  /* initialize google Map  */
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      // location of Alexandria city in Egypt
      center: {lat: 31.205753, lng: 29.924526},
      zoom: 14
    });
    // Create InfoWindow for mrkers
    let infowindow = new window.google.maps.InfoWindow();
    let markers = this.state.locations.map(location => {
      let markerContent = `${location.venue.name}`;
      let marker = new window.google.maps.Marker({
        position: {
          lat: location.venue.location.lat,
          lng: location.venue.location.lng
        },
        map: map,
        title: location.venue.name
      });
      // add eeventlistener when click on a marker
      marker.addListener('click', function() {
      // set the content of infowindow
      infowindow.setContent(markerContent);
      // open the infowindow
      infowindow.open(map, marker);

      });
      return marker;
    });
    this.setState({markers: markers});
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
      section:'outdoors',
      query:'outdoors',
      ll: '31.205753,29.924526',
      v: '20190429',
      limit: '10'
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        locations: response.data.response.groups[0].items
      }, this.loadMapScript());

    })
    .catch(error => {
        // hande error of fetching data
        alert('An error has occurred while fetching data!');
        console.log(`Error:  ${error}`);
    });
  }

  render() {
    const{ markers, locations } = this.state;

    return (
      <div className="app">
        <Header />
        <main>
          <SideBar markers={markers} locations={locations}  />
          <MyMap />
        </main>
      </div>

    )
  }

}
export default App;
