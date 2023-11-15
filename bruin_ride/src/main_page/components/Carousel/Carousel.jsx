import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import LoadingButton from '../LoginButton/login';
import one from '../imgs/1.jpg';
import two from '../imgs/2.jpg';
import three from '../imgs/3.jpg';
import './Carousel.css';

function CarouselImage(props) {
  return (
    <img
      className="imgs"
      src={props.src}
      alt={props.text}
      style={{width: '100%', height: '100%', paddingBottom: '0px'}}
    />
  );

}
function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  //console.log(props);
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <CarouselImage text="First slide" src={one}/>
        <Carousel.Caption className='caption'>
          <h3>Welcome to Bruin Ride</h3>
          <div> 
            <p>Sign up now!</p>        
            <LoadingButton LoginState={props['LoginState']} setLoginState={props['setLoginState']} setMain={props['setMain']}/>
          </div>       
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <LoadingButton />
        <CarouselImage text="Second slide" src={two}/>
        <Carousel.Caption className='caption'>
          <h3>Welcome to Bruin Ride</h3>
          <div> 
            <p>Sign up now!</p>        
            <LoadingButton LoginState={props['LoginState']} setLoginState={props['setLoginState']} setMain={props['setMain']}/>
          </div>       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <LoadingButton />
        <CarouselImage text="Third slide" src={three}/>
        <Carousel.Caption className='caption'>
          <h3>Welcome to Bruin Ride</h3>
          <div> 
            <p>Sign up now!</p>        
            <LoadingButton LoginState={props['LoginState']} setLoginState={props['setLoginState']} setMain={props['setMain']}/>
          </div>       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;