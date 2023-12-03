import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { NavLink } from 'react-router-dom';

const TopBar = () => {
  
  const user = localStorage.getItem('userSign') === 'true';
  /* change link for sign up item */
  if(user){
    return(
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
                  home
                </NavLink>
              </li>
  
              <li className="nav-item">
                <NavLink to='/bookride' className="nav-link">
                  book a ride
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/profile' className="nav-link">
                  profile
                </NavLink>
              </li>
              <li className="nav-item-2">
              <NavLink to='/signIn' className="nav-link">
                log out
              </NavLink>
            </li>
            </ul>
          </div>
          
        </div>
      </nav>
      </header>
    );
  }else {
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
                home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="signin-up">
          <ul className="nav-links">
            <li className="nav-item-2">
              <NavLink to='/signIn' className="nav-link">
                log in
              </NavLink>
            </li>

            <li className="nav-item-2">
              <NavLink to='/signIn' className="nav-link">
                sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
  }
};

export default TopBar;