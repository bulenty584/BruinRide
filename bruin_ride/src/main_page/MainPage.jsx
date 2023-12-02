import '../MainPage.css';
import React from 'react';
import divbox from '../images/Rectangle.png'
import TopBar from './components/Topbar/Topbar';
import ControlledCarousel from './components/Carousel/Carousel';

function MainPage() {
  return(
    <body>
    <div className="background-circles"></div>
    <div className="App">
      <TopBar />
      <main className='main'>  
        <ControlledCarousel />
      </main>
    </div>
    </body>
  );
}


export default MainPage;