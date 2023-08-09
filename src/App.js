import logo from './logo.svg';
import './App.css';

import NavigationSidebar from './components/NavigationSidebar';
import TodaysForecast from './components/TodaysForecast';
import CurrentWeather from './components/CurrentWeather';
import DailyForecastItem from './components/DailyForecastItem';



const Sidebar = () => {
  return (
    <div className="col-md-3 sidebar">
      <div className="gray-bg rounded-div">
        <div className='forcast-name'>
          <span className='gray-text'>daily forecast</span>
        </div>

        <DailyForecastItem day="Mon" iconSrc="./images/sun.png" weather="Sunny" temperature="31°" />
        <hr className='gray-text'/>
        <DailyForecastItem day="True" iconSrc="./images/cloud.png" weather="Sunny" temperature="31°" />
        <hr className='gray-text'/>
        <DailyForecastItem day="Mon" iconSrc="./images/sun.png" weather="Sunny" temperature="31°" />

      </div>
    </div>
  );
};


const MainContent = () => {
  return (
    <div className="col-md-7">
      <div className="mb-3">
        <form>
          <input id="city-name" type="text" className="form-control gray-bg rounded-div" placeholder="Search for city" />
        </form>
      </div>
      <CurrentWeather />

      <TodaysForecast />

      {/* Today's overview div */}
    </div>
  );
};

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Navigation Bar */}
        <NavigationSidebar />

        {/* Main Content Column */}
        <MainContent />

        {/* Sidebar Column */}
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
