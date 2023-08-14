import React from 'react';
import { Fragment } from 'react';

import HourlyForecast from './HourlyForecast';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import CurrentWeatherDetails from './CurrentWeatherDetails';

import getIconSrcAndDesc from '../utils'
import API from '../api/api';



class WeatherForecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: null
    };

    this.setForecastData = this.setForecastData.bind(this);
  }

  setForecastData(response) {
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
    console.log(currentHourData);

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

    this.setState({
      forecastData: {
        hourlyForecast: hourlyForecast,
        hourlyForecastUnits: hourlyForecastUnits,
        dailyForecast: dailyForecast,
        dailyForecastUnits: dailyForecastUnits,
        currentWeather: currentWeather
      }
    })
  }

  componentDidMount() {
    API.getForecast(this.props.latitude, this.props.longitude, this.setForecastData);
  }

  render() {
    const forecastData = this.state.forecastData;

    if (!forecastData) {
      return null;
    }
    else {
      return (
        <div className='row'>
          <div className='col-md-9'>
            <CurrentWeather selectedLocationInfo={this.props.selectedLocationInfo} currentWeather={forecastData.currentWeather} />
            <CurrentWeatherDetails 
              temperature={forecastData.currentWeather.temperature} 
              windSpeed={forecastData.currentWeather.windspeed} 
              humidity={forecastData.currentWeather.humidity}
              precipitationProbability={forecastData.currentWeather.precipitation_probability}
              />
            <HourlyForecast hourlyForecast={forecastData.hourlyForecast} units={forecastData.hourlyForecastUnits} />
          </div>
          <div className='col-md-3'>
            <DailyForecast dailyForecast={forecastData.dailyForecast} />
          </div>
        </div>
      )
    }
  }
}


export default WeatherForecast;