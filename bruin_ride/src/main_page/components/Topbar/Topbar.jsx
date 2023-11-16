import React, { useState, useEffect } from 'react';
import './Topbar.css';

const TopBar = () => {
  const [isDarkMode, setDarkMode] = useState(localStorage.getItem('mode') === 'dark-mode');
  const [isSearchActive, setSearchActive] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('mode', 'dark-mode');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('mode', 'light-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const toggleSearch = () => {
    setSearchActive(!isSearchActive);
  };


  return (
    <header className='navHeader'>
    <nav>
      <div className='nav-bar'>
        <span className="logoo navLogo">
          <a href="#" >
            Bruin Ride
          </a>
        </span>
        <div className="menu">
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="darkLight-searchBox">
          <div className="dropdown">
            <button className="dropbtn"></button>
            <div className="dropdown-content">
              <a href="#">Configuracion</a>
              <a href="#">Cerrar sesion</a>
            </div>
          </div>
          <div className={`dark-light ${isDarkMode ? 'active' : ''}`} onClick={toggleDarkMode}>
            <i className="bx bx-moon moon"></i>
            <i className="bx bx-sun sun"></i>
          </div>
          <div className="searchBox">
            <div className={`searchToggle ${isSearchActive ? 'active' : ''}`} onClick={toggleSearch}>
              <i className="bx bx-x cancel"></i>
              <i className="bx bx-search search"></i>
            </div>
            <div className={`search-field ${isSearchActive ? 'active' : ''}`}>
              <input type="text" placeholder="Search..." />
              <i className="bx bx-search"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default TopBar;