import escapeRegExp from 'escape-string-regexp';
// Import axios
import axios from 'axios';
import React from 'react';
import './App.css';
// import components
import MyMap from './components/mymap/MyMap';
import SideBar from './components/sidebar/SideBar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

class App extends React.Component {
  state = {
    locations : [],
    query:'',
    places: [],
    markers:[],
    isHidden:false // check side bar hidden or not for a11y
  }

  componentDidMount() {
    this.getLocations();

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
      section: 'outdoors',
      query: 'outdoors',
      ll: '30.06263, 31.24967',
      v: '20190429'
    };

    // fetching data
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        locations: response.data.response.groups[0].items
      }, this.loadMapScript());
    })
    .catch(error => {
        // handle error of fetching data
        alert('An error has occurred while fetching data of the places!');
        console.log(`Error:  ${error}`);
    });
  }


  /* initialize google Map  */
  initMap = () => {
    // create map
    let map = new window.google.maps.Map(document.getElementById('map'), {
      // location of Cairo city in Egypt
      center: {lat: 30.06263, lng:31.24967},
      zoom: 14
    });
    this.markers=[];
    // Create InfoWindow for mrkers
    let infowindow = new window.google.maps.InfoWindow();
    this.state.locations.forEach(location => {
      /* create markers at loction of each venue*/
      let marker = new window.google.maps.Marker({
        position: {
          lat: location.venue.location.lat,
          lng: location.venue.location.lng
        },
        map: map,
        title: location.venue.name,
        animation: window.google.maps.Animation.DROP
      });

      /* content of each marker */
      let markerContent =
        `<div aria-label="information window about ${location.venue.name}" tabIndex="0" class="info">
          <h3 class="info-header">${location.venue.name}</h2>
          <p class="info-detail" tabIndex="0">
            <span class="info-title">Address:</span>
            ${this.getAddress(location)}
          </p>
          <p class="info-detail" tabIndex="0">
            <span class="info-title">lat:</span>
            ${location.venue.location.lat},
            <span class="info-title"> lng:</span>
            ${location.venue.location.lng}
          </p>
      </div>`;

      /* add eventlistener when click on a marker
       * it animate and open infowindow contain data about that location
      */
      marker.addListener('click', function() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        // to stop animation after short time
        setTimeout(() => {marker.setAnimation(null)}, 700);
        // Changes the center of the map to the clicked marker position
        map.panTo(marker.position);
        // set the content of infowindow
        infowindow.setContent(markerContent);
        // set the maxWidth for infowindow
        infowindow.setOptions({maxWidth:360});
        // open the infowindow
        infowindow.open(map, marker);


      });

      /* fix the problem when click on a marker and infowindow
      * window is opend and start searching about another place
      * the infowindow still opened while marker is hidden
      */
      marker.addListener('visible_changed', function() {
        infowindow.close();
      });

      // finally push each marker to markers array
      this.markers.push(marker);
    });

    /* focus the infowindow when it open*/
    infowindow.addListener('domready', function(){
      let infoItem = document.querySelector('.info');
      infoItem.focus();
    });

    // update the markers state
    this.setState({markers:this.markers});

    // global function to handle authentication errors for google map
    window.gm_authFailure = function() {
      alert('Google maps failed to load, Authentication Failed!');
    }
  }


  /* loading map script */
  loadMapScript = () => {
    window.initMap = this.initMap;
    // first script element in the document
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyA2I0qEtPwrjkRVQ8BiK_FjnoWwmC4ubOY&callback=initMap');
  }


  /* get address of a place for the infowindow data
   * handle the issue of unavailable address in the data fetched from foursquare api
  */
  getAddress=(place)=>{
    let address = place.venue.location.address
    ? place.venue.location.address
    : 'Sorry, address is not available.';
    let city = place.venue.location.address && place.venue.location.city
    ? ` - ${place.venue.location.city}.`
    : '';
    return `${address}${city}`;
  }


  /*
  * search places used to filter the places by its name
  */
  searchPlaces = (query) => {
    const allPlaces = this.state.locations;
    let searchedResults;
    this.setState({ query: query }, () => {
      // make sure the user type and text not only white space
      if(query && query.length > 0 && query.trim().length !== 0) {
        const match = new RegExp(escapeRegExp(query), 'i')
        searchedResults = this.state.locations.filter(
          (location) => match.test(location.venue.name)
        );
      // make the result markers visible and the remaining hidden
      this.markers.forEach(
          (marker) => {
            match.test(marker.title)
            ? marker.setVisible(true)
            : marker.setVisible(false);
          });
        // update the state of places results of filtering
        this.setState({places: searchedResults});
      } else {
        // if no place matches the search make all markers visible
        this.markers.forEach(
          (marker) => {
            marker.setVisible(true);
          });
        this.setState({places: allPlaces});
      }
    });
  }


  /* using for indicate sidebar is hidden or not for a11y */
  toggleVisibility =(visible)=>{
    this.setState({isHidden:visible});
  }


  render() {
    const{ locations, places, query, isHidden} = this.state;
    return (
      <div className="app">
        <Header isHidden={isHidden} toggleVisibility={this.toggleVisibility} />
        <main>
          <SideBar
            markers={this.state.markers}
            locations={locations}
            searchPlaces={this.searchPlaces}
            query={query}
            places={places}
            isHidden={isHidden}
            toggleVisibility={this.toggleVisibility}
            />
          <MyMap />
        </main>
        <Footer />
      </div>
    )
  }
}

// Create the script tag for map integration
// resource: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
function loadJS(src) {
  let index  = window.document.getElementsByTagName('script')[0];
    // create script element for google map
    let script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    // handle error on loading map
    script.onerror = function() {
      alert('Oh no, There is an error occurred during loading map!');
    };
    // make script of map be first script in the page
    index.parentNode.insertBefore(script, index);
}

export default App;