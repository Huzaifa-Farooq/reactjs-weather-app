import React from 'react';
import { Fragment } from 'react';

import '../css/weather-icons.css'
import '../css/weather-icons.min.css'
import '../css/weather-icons-wind.css'
import '../css/weather-icons-wind.min.css'


const CurrentWeatherDetails = (props) => {
  return (
    <div style={{ marginTop: '10px' }} className='gray-bg rounded-div mb-3'>
      <div className='forcast-name'>
        <span className='gray-text'>Details</span>
      </div>
      <div className='row'>
        <CurrentWeatherDetailItem iconName='wi-thermometer' title='Temperature' value='36°' />
        <CurrentWeatherDetailItem iconName='wi-wind' title='Wind' value='22km/h' />
        <CurrentWeatherDetailItem iconName='wi-raindrop' title='Chance of rain' value='3%' />
        <CurrentWeatherDetailItem iconName='wi-raindrop' title='Chance of rain' value='3%' />
      </div>
    </div>
  );
}


const CurrentWeatherDetailItem = ({ iconName, title, value }) => {
  return (
    <div className='col-4'>
      <div className='curr-weather-detail-item'>
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: '3px', textAlign: 'center' }} className='col-2'>
            <i style={{ fontSize: '22px' }} className={'gray-text wi ' + iconName}></i>
          </div>
          <div className='col-10'>
            <span style={{ fontSize: '15px' }} className='gray-text'>{title}</span><br />
            <span style={{ marginLeft: 'auto', fontSize: '24px', fontWeight: 800 }} className='white-text'>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherDetails;