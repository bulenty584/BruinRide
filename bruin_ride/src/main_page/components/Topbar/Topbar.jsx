import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { NavLink } from 'react-router-dom';
import {db, auth} from '../../../login/SignInOut';
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from '../../../context/context';
import { useContext } from 'react';


const TopBar = () => {
  const {login, logout, isLoggedIn} = useContext(AuthContext);
  console.log(isLoggedIn());

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        logout();  // Update context or state to reflect logout
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };


  return (
    <>
    {isLoggedIn() ? (
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
             
            </ul>
          </div>
          <div className="logout">
            <ul className="nav-links">
              <li className="nav-item-2" >
                <NavLink to='/mainPage' className="nav-link">
                  <button className="logout-button" onClick={handleLogout}>log out</button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </header>
  ) : (
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
  )}
  </>
  );
};

export default TopBar;
