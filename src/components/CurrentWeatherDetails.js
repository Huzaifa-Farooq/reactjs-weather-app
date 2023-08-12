import React from 'react';
import { Fragment } from 'react';

import '../css/weather-icons.css'
import '../css/weather-icons.min.css'
import '../css/weather-icons-wind.css'
import '../css/weather-icons-wind.min.css'


const CurrentWeatherDetails = (props) => {
  return (
    <div className='gray-bg rounded-div'>
      <div className='forcast-name'>
        <span className='gray-text'>Details</span>
      </div>
      <div className='row'>
        <CurrentWeatherDetailItem iconName='wi-thermometer' title='Temperature' value='36' />
      </div>
    </div>
  );
}


const CurrentWeatherDetailItem = ({ iconName, title, value }) => {
  return (
    <div className='col-3'>
      <div className='curr-weather-detail-item'>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '5px' }} className='col-1'>
            <i style={{ fontSize: '28px' }} className={'gray-text wi ' + iconName}></i>
          </div>
          <span style={{ fontSize: '20px' }} className='gray-text'>{title}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='col-2'></div>
            <div className='col-6'>
              <span style={{ fontSize: '32px' }} className='white-text'>{value}</span>
            </div>
          </div>
      </div>
    </div>
  );
}

export default CurrentWeatherDetails;