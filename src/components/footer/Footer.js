import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
render() {
    return (
      <footer role="contentinfo">
        <p>
			Powered by <a href="https://developer.foursquare.com/">
			Foursquare API</a> and <a href="https://cloud.google.com/maps-platform/">Google Maps </a>.
        </p>
      </footer>
    )
  }
}

export default Footer;


