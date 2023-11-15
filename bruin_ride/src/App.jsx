import './App.css';
import MainPage from './main_page/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import LoginPage from './login/Login';

function App() {
  const [mainPage, SetMainPage] = useState(true);
  const [Login, SetLogin] = useState(false);
  if(mainPage){
    return ( 
        <MainPage LoginState={Login} setLoginState={SetLogin} setMain={SetMainPage}/>
    );
  }
  else if(Login){
    return (
      <LoginPage/>
    );
  }
  else{
    return(
    <></>
    );
  }
}

export default App;
