import React from 'react';
import {Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignInOut from './login/SignInOut';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import MainPage from './main_page/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signIn" element={<SignInOut />} />
      <Route path="/mainPage" element={<MainPage />} />

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
