import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { NavLink } from 'react-router-dom';

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
          <NavLink to='/mainPage' >
            Bruin Ride
          </NavLink>
        </span>
        <div className="menu">
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink to='/mainPage' className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/signIn' className="nav-link">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/profile' className="nav-link">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/bookride' className="nav-link">
                Book Ride
              </NavLink>
            </li>

          </ul>
        </div>
        <div className="darkLight-searchBox">
          <div className="dropdown">
            <i className='bx bx-user dropbtn bx-sm'></i>
            <div className="dropdown-content">
            <NavLink to='/profile' className="nav-link">Past Trips</NavLink>
            <NavLink to='/profile' className="nav-link">Settings</NavLink>
            <NavLink to='/signIn' className="nav-link">SignOut</NavLink>
            </div>
          </div>
          <div className={`dark-light ${isDarkMode ? 'active' : ''}`} onClick={toggleDarkMode}>
            <i className="bx bx-moon bx-sm moon"></i>
            <i className="bx bx-sun bx-sm sun"></i>
          </div>
          <div className="searchBox">
            <div className={`searchToggle ${isSearchActive ? 'active' : ''}`} onClick={toggleSearch}>
              <i className="bx bx-x bx-sm cancel"></i>
              <i className="bx bx-search bx-sm search"></i>
            </div>
            <div className={`search-field ${isSearchActive ? 'active' : ''}`}>
              <input type="text" placeholder="Search..." />
              <i className="bx bx-search bx-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default TopBar;