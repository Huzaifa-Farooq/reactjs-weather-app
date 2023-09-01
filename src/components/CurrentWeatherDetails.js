import React, { useState } from 'react';
import { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWind,
  faTint,
  faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons'

import { formatTimeToAMPM } from '../utils';


const CurrentWeatherDetails = ({
  temperature, windSpeed, precipitationSum, humidity, precipitationProbability, feelsLike, sunrise, sunset, units
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    setExpanded(!expanded);
  }

  const count = 6;
  const weatherDetails = [
    { title: 'Temperature', value: `${temperature} ${units.temperature_unit}`, iconName: 'wi wi-thermometer' },
    { title: 'Feels like', value: `${feelsLike} ${units.temperature_unit}`, iconName: 'wi wi-thermometer' },
    { title: 'Wind', value: `${windSpeed} ${units.windspeed_unit}`, iconElement: <FontAwesomeIcon fontSize={22} className='gray-text' icon={faWind} />, },
    {
      title: 'Chance of rain', value: `${precipitationProbability}%`,
      iconElement: <FontAwesomeIcon fontSize={22} className='gray-text' icon={faTint} />
    },
    {
      title: "Precipitation", value: `${precipitationSum} ${units.precipitation_unit}`,
      iconElement: <FontAwesomeIcon fontSize={22} className='gray-text' icon={faTint} />
    },
    { title: "Sunrise", value: formatTimeToAMPM(sunrise, true), iconName: 'wi wi-sunrise' },
    { title: "Sunset", value: formatTimeToAMPM(sunset, true), iconName: 'wi wi-sunset' },
    { title: 'Humidity', value: `${humidity}%`, iconName: 'wi wi-humidity' },
  ].filter(item => item.value !== undefined && !item.value.includes("undefined"));
  const weatherDetailsArray = !expanded ? weatherDetails.slice(0, count) : weatherDetails;

  const showExpandButton = weatherDetailsArray.length < weatherDetails.length || expanded;

  return (
    <div style={{ marginTop: '10px' }} className='gray-bg rounded-div mb-3'>
      <div className='forcast-name'>
        <span className='gray-text'>Details</span>
        {
        showExpandButton && (
        <button className='button-round button btn btn-sm btn-primary float-right' onClick={toggleDetails}>
          {expanded ? 'Hide Details' : 'Show Details'}
          <FontAwesomeIcon className={'rotate-c-180 ' + (expanded ? 'rotate' : '')} style={{ marginLeft: '5px'}} icon={faChevronUp} />

        </button>
        )
        }
      </div>
      <div className={'container expandable-div ' + (expanded ? 'expanded' : '')}>
        <div className='row'>
          {weatherDetailsArray.map((item, index) => {
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