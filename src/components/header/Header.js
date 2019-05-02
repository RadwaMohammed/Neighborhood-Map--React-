import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  toggleSideBar = () => {
        document.querySelector('aside').classList.toggle('toggle');

    }
render() {
    return (
      <header>
        <div className="toggle-btn-container"><span className="toggle-btn fas fa-bars" onClick={this.toggleSideBar}></span></div>
        <h1 className="page-header">Outdoor places in Alexandria, Egypt</h1>
      </header>
    )
  }
}

export default Header;


