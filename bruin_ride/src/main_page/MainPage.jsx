import React from 'react';
import TopBar from './components/Topbar/Topbar';
import ControlledCarousel from './components/Carousel/Carousel';


function MainPage() {
  return(
    <div className="App">
      <TopBar />
      <main className='main'>
        <div><ControlledCarousel /></div>
      </main>
    </div>
  );
}

export default MainPage;