import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
render() {
    return (
      <header>
        <span className="toggle-sidebar fas fa-bars"></span>
        <h1 className="page-header">Outdoor places in Alexandria, Egypt</h1>
      </header>
    )
  }
}

export default Header;


