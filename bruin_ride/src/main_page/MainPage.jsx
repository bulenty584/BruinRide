import React from 'react';
import TopBar from './components/Topbar/Topbar';
import ControlledCarousel from './components/Carousel/Carousel';


function MainPage(props) {
  //console.log(props['setLoginState']);
  return(
    <div className="App">
      <TopBar />
      <main className='main'>
        <div><ControlledCarousel LoginState={props['LoginState']} setLoginState={props['setLoginState']} setMain={props['setMain']}/></div>
      </main>
    </div>
  );
}

export default MainPage;