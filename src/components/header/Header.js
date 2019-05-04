import PropTypes from 'prop-types';
import React from 'react';
import './Header.css';

function Header(props) {
  const { toggleVisibility, isHidden } = props;
  // hide and show sidebar that contain search part
  function toggleSideBar() {
    let sideBar =document.querySelector('aside');
    sideBar.classList.toggle('toggle');

    sideBar.classList.contains("toggle")
      ? toggleVisibility(true)
      : toggleVisibility(false);
  }
  return (
    <header role="banner">
      <div className="toggle-btn-container">
        <button
          className="toggle-btn"
          onClick={toggleSideBar}
          aria-label={isHidden ? "show search for places":"hide search for places"}>
            <i className=" fas fa-bars"></i>
        </button>
        </div>
      <h1 className="page-header">Outdoor places in Cairo, Egypt</h1>
    </header>
  )
}

/* validate data types */
Header.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired
}

export default Header;