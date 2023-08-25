import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react';

import NavigationSidebar from './components/NavigationSidebar';
import SearchBar from './components/SearchBar';
import WeatherForecast from './components/WeatherForecast';
import Settings from './components/Settings';
import DailyHistorial from './components/DailyHistorial';

import { getIconSrcAndDesc, unitsMap } from './utils'
import API from './api/api';

// importing all CSS files from /css/ directory
import './css/main.css'
import './css/weather-icons.css'
import './css/weather-icons.min.css'
import './css/weather-icons-wind.css'
import './css/weather-icons-wind.min.css'

import 'react-day-picker/dist/style.css';

import Cookies from 'js-cookie';


const MainContent = ({
  selectedLocationCords, setLocationCordinates, selectedLocationInfo, setLocationData,
  forecastData, units
}) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const searchForLocation = (keywords) => {
    const handleSuggestions = (suggestions) => {
      const results = suggestions.results ? suggestions.results : [];
      setSearchSuggestions(results);
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
        units={
          {
            ...units,
            temperature_unit: unitsMap[units.temperature_unit],
            precipitation_unit: unitsMap[units.precipitation_unit]
          }
        }
      />
    </Fragment>
  );
};


const App = () => {
  const [activeSection, setActiveSection] = useState({ prev: null, current: 'home' });

  const [selectedLocationCords, setSelectedLocationCords] = useState({ latitude: 33.976, longitude: 72.4140 });
  const [selectedLocationInfo, setSelectedLocationInfo] = useState({
    cityName: 'Kamra, Attock, Pakistan',
    countryCode: 'PK'
  }); // [cityName, subTitle]
  const [forecastData, setForecastData] = useState(null);
  const [currentUnits, setCurrentUnits] = useState({});

  const settingsObject = [
    {
      title: "Temperature",
      identifier: "temperature_unit",
      options: [
        { value: 'celsius', displayText: "Celcius", active: true },
        { value: 'fahrenheit', displayText: "Fahrenheit", active: false },
      ]
    },
    {
      title: "Wind Speed",
      identifier: "windspeed_unit",
      options: [
        { value: 'kmh', displayText: "Km/h", active: true },
        { value: 'ms', displayText: "m/s", active: false },
        { value: 'mph', displayText: "Mph", active: false },
        { value: 'kn', displayText: "Knots", active: false },
      ]
    },
    {
      title: "Precipitation",
      identifier: "precipitation_unit",
      options: [
        { value: "mm", displayText: 'Milimeters', active: true },
        { value: "inch", displayText: 'Inches', active: false },
      ]
    }
  ];


  // setting default cookies if not set
  const units = {};
  settingsObject.forEach((setting) => {
    const cookieValue = Cookies.get(setting.identifier);
    const defaultOption = setting.options.filter(option => option.active)[0].value;
    units[setting.identifier] = cookieValue || defaultOption;

    if (!cookieValue) {
      Cookies.set(setting.identifier, defaultOption);
    }
  })

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
    if (opt != activeSection) {
      setActiveSection({ prev: activeSection.current, current: opt });
    }
  }


  const updateForecastData = (response) => {
    const currentHourData = response.hourly.time.map((timestamp, index) => {
      const time = new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date
      if ((time.getHours() === new Date().getHours()) && (time.getDate() === new Date().getDate())) {
        return {
          precipitation_probability: response.hourly.precipitation_probability[index],
          humidity: response.hourly.relativehumidity_2m[index],
          feelsLike: response.hourly.apparent_temperature[index],
        };
      }
      else {
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
    const dailyForecast = response.daily.time.map((timestamp, index) => {
      const wmoCode = response.hourly.weathercode[index]
      const isDay = true;
      const { iconSrc, description } = getIconSrcAndDesc(wmoCode, isDay);

      return {
        time: new Date(timestamp * 1000),
        temperature_2m_max: response.daily.temperature_2m_max[index],
        temperature_2m_min: response.daily.temperature_2m_min[index],
        precipitation_probability_max: response.daily.precipitation_probability_max[index],
        windspeed_10m_max: response.daily.windspeed_10m_max[index],
        apparent_temperature_max: response.daily.apparent_temperature_max[index],
        apparent_temperature_min: response.daily.apparent_temperature_min[index],
        iconSrc,
        description
      };
    });

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
      description,

    };

    setForecastData({
      hourlyForecast: hourlyForecast,
      dailyForecast: dailyForecast,
      currentWeather: currentWeather
    })
  }

  const getActiveSection = () => {
    const opt = activeSection.current;
    const prevActiveSection = activeSection.prev;

    const menuOrder = ['home', 'historical-data', 'settings'];
    const fadeInDownAnimation = 'animate__fadeInDown';
    const fadeInUpAnimation = 'animate__fadeInUp';

    // determining animation class
    let animationClass = fadeInDownAnimation;
    if (prevActiveSection && menuOrder.indexOf(opt) > menuOrder.indexOf(prevActiveSection)) {
      animationClass = fadeInUpAnimation;
    }

    console.log(opt, prevActiveSection, animationClass);

    if (opt === 'home') {
      return (
        <div className={'col-md-11 forecast-container ' + animationClass}>
            <MainContent
              selectedLocationCords={selectedLocationCords}
              selectedLocationInfo={selectedLocationInfo}
              setLocationCordinates={setLocationCordinates}
              setLocationData={setLocationData}
              forecastData={forecastData}
              units={units}
            />
          </div>
      );
    }
    else if (opt === 'settings') {
      return (
        <div className={'col-md-8 settings-div ' + animationClass} style={{ marginTop: '20px' }}>
            <Settings
              settingsObject={settingsObject}
            />
          </div>
      )
    }
    else if (opt === 'historical-data') {
      return (
        <div className={'col-md-11 daily-historical-container ' + animationClass}>
            <DailyHistorial
              latitude={selectedLocationCords.latitude}
              longitude={selectedLocationCords.longitude}
              startDate={new Date('2023-08-01')}
              endDate={new Date('2023-08-20')}
              units={currentUnits}
            />
        </div>
      )
    }
  }


  // Effect for units changes
  useEffect(() => {
    if (JSON.stringify(units) !== JSON.stringify(currentUnits)) {
      setCurrentUnits(units);
    }
  }, [currentUnits, units]);

  // Effect for selectedLocationCords changes
  useEffect(() => {
    setForecastData(null);
    API.getForecast(
      selectedLocationCords.latitude,
      selectedLocationCords.longitude,
      updateForecastData,
      currentUnits
    );
  }, [selectedLocationCords, currentUnits]);

  return (
    <div className="">
      <div className="row">
        <div className='col-md-1 nav-main-div'>
          <NavigationSidebar
            activeSectionName={activeSection}
            setActiveSection={handleSectionActivation}
          />
        </div>
        {
          getActiveSection()
        }
      </div>
    </div>
  );
}

export default App;
