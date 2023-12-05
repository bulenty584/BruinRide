import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

localStorage.setItem("userSign", "false");
localStorage.setItem("TripAdded", "false");

export const AuthProvider = ({ children }) => {
  const [change, setChange] = useState(false);

  useEffect(() => {
    // Initialize local storage value only once when the component is mounted
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userSign", "true");
      } else {
        localStorage.setItem("userSign", "false");
      }
      setChange(!change); // Trigger re-render
    });
  }, []);

  const login = () => {
    localStorage.setItem("userSign", "true");
    setChange(!change); // Trigger re-render
  };

  const logout = () => {
    localStorage.setItem("userSign", "false");
    setChange(!change); // Trigger re-render
  };

  const isLoggedIn = () => {
    return localStorage.getItem("userSign") === "true";
  }

  const TripAdded = () => {
    localStorage.setItem("tripAdded", "true");
    setChange(!change); // Trigger re-render
  };

  const isTripAdded = () => {
    return localStorage.getItem("tripAdded") === "true";
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, TripAdded, isTripAdded }}>
      {children}
    </AuthContext.Provider>
  );
};
