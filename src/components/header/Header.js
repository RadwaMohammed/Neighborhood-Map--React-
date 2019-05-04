import React from 'react';
import './Header.css';

function Header() {
  // hide and show sidebar that contain search part
  function toggleSideBar() {
    document.querySelector('aside').classList.toggle('toggle');
  }
  return (
    <header role="banner">
      <div className="toggle-btn-container">
        <span
          className="toggle-btn fas fa-bars"
          tabidex="0"
          onClick={toggleSideBar}
          role="button"
          aria-label="click here to hide or show search places list">
        </span>
        </div>
      <h1 className="page-header">Outdoor places in Alexandria, Egypt</h1>
    </header>
  )
}

export default Header;