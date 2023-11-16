import './App.css';
import MainPage from './main_page/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import SignInOut from './login/SignInOut';

function App() {
  const [mainPage, SetMainPage] = useState(true);
  const [Login, SetLogin] = useState(false);
  if(mainPage){
    return ( 
        <MainPage/>
    );
  }
  else if(Login){
    return (
      <SignInOut/>
    );
  }
  else{
    return(
    <></>
    );
  }
}

export default App;
