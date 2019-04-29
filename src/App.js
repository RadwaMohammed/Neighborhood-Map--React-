import React from 'react';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.loadMapScript();
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


  render() {
    return (
      <main>
        <div id="map"></div>
      </main>

    )
  }

}
export default App;
