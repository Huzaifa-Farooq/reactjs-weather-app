import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useCallback, useRef } from 'react';

import NavigationSidebar from './components/NavigationSidebar';
import HourlyForecast from './components/HourlyForecast';
import CurrentWeather from './components/CurrentWeather';
import DailyForecastItem from './components/DailyForecastItem';
import SearchBar from './components/SearchBar';

import API from './api/api';


const Sidebar = () => {
  return (
    <div className="col-md-3 sidebar">
      <div className="gray-bg rounded-div">
        <div className='forcast-name'>
          <span className='gray-text'>daily forecast</span>
        </div>

        <DailyForecastItem day="Today" iconSrc="./images/sun.png" weather="Sunny" temperature="31°" />
        <hr className='gray-text'/>
        <DailyForecastItem day="True" iconSrc="./images/cloud.png" weather="Sunny" temperature="31°" />
        <hr className='gray-text'/>
        <DailyForecastItem day="Mon" iconSrc="./images/sun.png" weather="Sunny" temperature="31°" />

      </div>
    </div>
  );
};


const MainContent = (props) => {
  const [selectedLocationCords, setSelectedLocationCords] = useState({ latitude: null, longitude: null });
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const searchForLocation = (keywords) => {
    const handleSuggestions = (suggestions) => {
      setSearchSuggestions(suggestions.results);
    }
    API.getSearchSuggestions(keywords, handleSuggestions);
  }

  const setLocationCordinates = (cordinates) => {
    if (cordinates.latitude === null || cordinates.longitude === null) {
      return;
    }
    setSelectedLocationCords(cordinates);
  }

  return (
    <div className="col-md-7">

    <SearchBar 
      setLocationCordinates={setLocationCordinates} 
      searchSuggestions={searchSuggestions} 
      searchForLocation={searchForLocation}
    />

    <CurrentWeather latitude={selectedLocationCords.latitude} longitude={selectedLocationCords.longitude} />

    <HourlyForecast />

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
