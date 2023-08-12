import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useCallback, useRef, Fragment } from 'react';

import NavigationSidebar from './components/NavigationSidebar';
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';

import API from './api/api';

// importing all CSS files from /css/ directory
import './css/main.css'
import './css/weather-icons.css'
import './css/weather-icons.min.css'
import './css/weather-icons-wind.css'
import './css/weather-icons-wind.min.css'


const MainContent = (props) => {
  const [selectedLocationCords, setSelectedLocationCords] = useState({ latitude: 33.8580, longitude: 72.4140 });
  const [selectedLocationInfo, setSelectedLocationInfo] = useState({
    cityName: 'Kamra, Attock',
    countryCode: 'PK'
  }); // [cityName, subTitle]
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

  const setLocationData = (locationData) => {
    setSelectedLocationInfo(locationData);
  }

  return (
    <div className="col-md-11">
      <SearchBar
        setLocationCordinates={setLocationCordinates}
        setLocationData={setLocationData}
        searchSuggestions={searchSuggestions}
        searchForLocation={searchForLocation}
      />
      <WeatherForecast 
        latitude={selectedLocationCords.latitude} 
        longitude={selectedLocationCords.longitude}
        selectedLocationInfo={selectedLocationInfo}
      />
    </div>
  );
};


const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavigationSidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
