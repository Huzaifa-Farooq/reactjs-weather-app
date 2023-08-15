import React from 'react';
import { Fragment } from 'react';

import HourlyForecast from './HourlyForecast';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import CurrentWeatherDetails from './CurrentWeatherDetails';



const WeatherForecast = (props) => {
  const forecastData = props.forecastData;

  if (!forecastData) {
    return null;
  }
  else {
    return (
      <div className='row'>
        <div className='col-md-9'>
          <CurrentWeather 
            selectedLocationInfo={props.selectedLocationInfo} 
            currentWeather={forecastData.currentWeather}
            units={props.units}
          />
          <CurrentWeatherDetails
            temperature={forecastData.currentWeather.temperature}
            windSpeed={forecastData.currentWeather.windspeed}
            humidity={forecastData.currentWeather.humidity}
            precipitationProbability={forecastData.currentWeather.precipitation_probability}
            feelsLike={forecastData.currentWeather.feelsLike}
            units={props.units}
          />
          <HourlyForecast hourlyForecast={forecastData.hourlyForecast} units={props.units} />
        </div>
        <div className='col-md-3'>
          <DailyForecast dailyForecast={forecastData.dailyForecast} units={props.units} />
        </div>
      </div>
    ) 
  }
}


export default WeatherForecast;