import logo from './logo.svg';
import './App.css';
import TopBar from './Components/Topbar/Topbar';
import ControlledCarousel from './Components/Carousel/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <TopBar />
      <main className='main'>
        <div><ControlledCarousel /> {logo} </div>
      </main>
    </div>
  );
}

export default App;
