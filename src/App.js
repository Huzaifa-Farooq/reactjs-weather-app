import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useCallback, useRef, Fragment } from 'react';

import NavigationSidebar from './components/NavigationSidebar';
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import Settings from './components/Settings';

import getIconSrcAndDesc from './utils'
import API from './api/api';

// importing all CSS files from /css/ directory
import './css/main.css'
import './css/weather-icons.css'
import './css/weather-icons.min.css'
import './css/weather-icons-wind.css'
import './css/weather-icons-wind.min.css'


const MainContent = ({ 
  selectedLocationCords, setLocationCordinates, selectedLocationInfo, setLocationData,
  forecastData
}) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const searchForLocation = (keywords) => {
    const handleSuggestions = (suggestions) => {
      setSearchSuggestions(suggestions.results);
    }
    API.getSearchSuggestions(keywords, handleSuggestions);
  }

  return (
    <Fragment>
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
        forecastData={forecastData}
      />
    </Fragment>
  );
};


const App = () => {
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  const [selectedLocationCords, setSelectedLocationCords] = useState({ latitude: 33.8580, longitude: 72.4140 });
  const [selectedLocationInfo, setSelectedLocationInfo] = useState({
    cityName: 'Kamra',
    countryCode: 'PK'
  }); // [cityName, subTitle]
  const [forecastData, setForecastData] = useState(null);

  const setLocationCordinates = (cordinates) => {
    if (cordinates.latitude === null || cordinates.longitude === null) {
      return;
    }
    setSelectedLocationCords(cordinates);
  }

  const setLocationData = (locationData) => {
    setSelectedLocationInfo(locationData);
  }

  const handleSectionActivation = (opt) => {
    switch (opt) {
      case 'home':
        setIsHomeActive(true);
        setIsSettingsActive(false);
        break;
      case 'settings':
        setIsHomeActive(false);
        setIsSettingsActive(true);
        break;
      default:
        break;
    }
  }

  const updateForecastData = (response) => {
    const currentHourData = response.hourly.time.map((timestamp, index) => {
      const time = new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date
      if((time.getHours() === new Date().getHours()) && (time.getDate() === new Date().getDate())) {
        return {
          precipitation_probability: response.hourly.precipitation_probability[index],
          humidity: response.hourly.relativehumidity_2m[index],
        };
      }
      else{
        return null;
      }
    }).filter((item) => item != null)[0];

    const hourlyForecast = response.hourly.time.map((timestamp, index) => {
      const wmoCode = response.hourly.weathercode[index];
      const time = new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date
      const isDay = time.getHours() >= 6 && time.getHours() < 18; // Assuming daytime is between 6 AM and 6 PM  
      const { iconSrc, description } = getIconSrcAndDesc(wmoCode, isDay);

      return {
        time: time,
        temperature_2m: response.hourly.temperature_2m[index],
        precipitation_probability: response.hourly.precipitation_probability[index],
        windspeed_10m: response.hourly.windspeed_10m[index],
        iconSrc,
        description
      };
    });
    const hourlyForecastUnits = response.hourly_units;
    const dailyForecast = response.daily.time.map((timestamp, index) => {
      const wmoCode = response.hourly.weathercode[index]
      const time = new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date
      const isDay = time.getHours() >= 6 && time.getHours() < 18; // Assuming daytime is between 6 AM and 6 PM  
      const { iconSrc, description } = getIconSrcAndDesc(wmoCode, isDay);

      return {
        time: time,
        temperature_2m_max: response.daily.temperature_2m_max[index],
        temperature_2m_min: response.daily.temperature_2m_min[index],
        precipitation_probability_max: response.daily.precipitation_probability_max[index],
        iconSrc,
        description
      };
    });
    const dailyForecastUnits = response.daily_units;

    const wmoCode = response.current_weather.weathercode;
    const time = new Date(response.current_weather.time * 1000); // Convert UNIX timestamp to JavaScript Date
    const isDay = time.getHours() >= 6 && time.getHours() < 18; // Assuming daytime is between 6 AM and 6 PM  
    const { iconSrc, description } = getIconSrcAndDesc(wmoCode, isDay);
    const currentWeather = {
      ...currentHourData,
      "temperature": response.current_weather.temperature,
      "windspeed": response.current_weather.windspeed,
      "winddirection": response.current_weather.winddirection,
      iconSrc,
      description

    };

    setForecastData({
        hourlyForecast: hourlyForecast,
        hourlyForecastUnits: hourlyForecastUnits,
        dailyForecast: dailyForecast,
        dailyForecastUnits: dailyForecastUnits,
        currentWeather: currentWeather
      })
  }

  // updating only when selectedLocationCords changes
  useEffect(() => {
    API.getForecast(selectedLocationCords.latitude, selectedLocationCords.longitude, updateForecastData)
  }, [selectedLocationCords]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'>
          <NavigationSidebar 
            isHomeActive={isHomeActive} 
            isSettingsActive={isSettingsActive} 
            setActiveSection={handleSectionActivation} 
          />
        </div>

        {
          isHomeActive ? (
            <div className='col-md-11'>
              <MainContent
                selectedLocationCords={selectedLocationCords}
                selectedLocationInfo={selectedLocationInfo}
                setLocationCordinates={setLocationCordinates}
                setLocationData={setLocationData}
                forecastData={forecastData}
              />
            </div>
          ) : (
            <div className='col-md-8' style={{ marginTop: '20px' }}>
              <Settings />
            </div>
          )
        }

      </div>
    </div>
  );
};

export default App;
