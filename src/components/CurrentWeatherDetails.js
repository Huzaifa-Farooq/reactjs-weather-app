import React from 'react';
import { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWind,
  // water drop
  faTint,
} from '@fortawesome/free-solid-svg-icons'

import '../css/weather-icons.css'
import '../css/weather-icons.min.css'
import '../css/weather-icons-wind.css'
import '../css/weather-icons-wind.min.css'


const CurrentWeatherDetails = ({ temperature, windSpeed, humidity, precipitationProbability, feelsLike, units }) => {
  const weatherDetails = [
    { title: 'Temperature', value: `${temperature} ${units.temperature_unit}`, iconName: 'wi wi-thermometer' },
    { title: 'Feels like', value: `${feelsLike} ${units.temperature_unit}`, iconName: 'wi wi-thermometer' },
    { title: 'Wind', value: `${windSpeed} ${units.windspeed_unit}`, iconElement: <FontAwesomeIcon fontSize={22} className='gray-text' icon={faWind} />, },
    { title: 'Humidity', value: `${humidity}%`, iconName: 'wi wi-humidity' },
    {
      title: 'Chance of rain', value: `${precipitationProbability}%`,
      iconElement: <FontAwesomeIcon fontSize={22} className='gray-text' icon={faTint} />
    },
  ];

  return (
    <div style={{ marginTop: '10px' }} className='gray-bg rounded-div mb-3'>
      <div className='forcast-name'>
        <span className='gray-text'>Details</span>
      </div>
      <div className='container'>
        <div className='row'>
          {weatherDetails.map((item, index) => {
            if (item.value !== undefined && !item.value.includes("undefined")) {
              return (
                <div className='col-md-4 col-sm-6' style={{ marginBottom: '10px' }}>
                  <CurrentWeatherDetailItem
                    key={index}
                    title={item.title}
                    value={item.value}
                    iconName={item.iconName}
                    iconElement={item.iconElement}
                  />
                </div>
              );
            }
          })
          }
        </div>
      </div>
    </div>
  );
}


const CurrentWeatherDetailItem = ({ iconName, iconElement, title, value }) => {
  const icon = iconElement ? iconElement : <i style={{ fontSize: '22px' }} className={'gray-text ' + iconName}></i>
  return (
    <div className='curr-weather-detail-item'>
      <div style={{ display: 'flex' }}>
        <div style={{ marginTop: '3px', textAlign: 'center' }} className='col-2'>
          {/* <i style={{ fontSize: '22px' }} className={'gray-text ' + iconName}></i> */}
          {icon}
        </div>
        <div className='col-10'>
          <span style={{ fontSize: '15px' }} className='gray-text'>{title}</span><br />
          <span style={{ marginLeft: 'auto', fontSize: '24px', fontWeight: 800 }} className='white-text'>{value}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherDetails;