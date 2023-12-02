import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { NavLink } from 'react-router-dom';

const TopBar = () => {
  
  /* change link for sign up item */

  return (
    <header className='navHeader'>
    <nav>
      <div className='nav-bar'>
        <span className="logoo navLogo">
          <NavLink to='/mainPage' >
            BruinRide
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
              <NavLink to='/bookride' className="nav-link">
                Book a ride
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to='/profile' className="nav-link">
                Profile
              </NavLink>
            </li>

          </ul>
        </div>
        <div className="signin-up">
          <ul className="nav-links">
            <li className="nav-item-2">
              <NavLink to='/signIn' className="nav-link">
                Log in
              </NavLink>
            </li>

            <li className="nav-item-2">
              <NavLink to='/signIn' className="nav-link">
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default TopBar;