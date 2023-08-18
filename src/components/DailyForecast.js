import DailyForecastItem from './DailyForecastItem';
import DailyForecastDetailsOverlay from './DailyForecastDetailsOverlay';

import { useState, Fragment } from 'react';



const DailyForecast = (props) => {
  const dailyForecast = props.dailyForecast;
  const hourlyForecast = props.hourlyForecast;
  const units = props.units;

  const [showOverlay, setShowOverlay] = useState(false);
  const [filteredHourlyForecast, setFilteredHourlyForecast] = useState([]);
  const [filteredDateForecast, setfilteredDateForecast] = useState('');

  const handleDailyForecastClick = (date) => {
    // only show hourly forecast for the selected date
    setFilteredHourlyForecast(hourlyForecast.filter((data) => {
      return data.time.toLocaleDateString() === date.toLocaleDateString();
    }));

    setfilteredDateForecast(dailyForecast.filter((data) => {
      return data.time.toLocaleDateString() === date.toLocaleDateString();
    })[0]
      );

    setShowOverlay(true);
  }

  return (
    <Fragment>
      <div className="sidebar">
        <div className="gray-bg rounded-div">
          <div className='forcast-name'>
            <span className='gray-text'>Daily forecast</span>
          </div>
          <div className='daily-forecast-container'>
            {
              dailyForecast.map((data, index) => {
                return <>
                  <DailyForecastItem
                    key={index}
                    day={data.time.toLocaleString('en-US', { weekday: 'short' })}
                    time={data.time}
                    iconSrc={data.iconSrc}
                    description={data.description}
                    temperatureMax={`${data.temperature_2m_max}${units.temperature_unit}`}
                    temperatureMin={`${data.temperature_2m_min}${units.temperature_unit}`}
                    handleDailyForecastClick={handleDailyForecastClick}
                  />
                  <hr className='gray-text' />
                </>
              })
            }
          </div>
        </div>
      </div>
      {
        showOverlay && <DailyForecastDetailsOverlay
          weatherForecast={filteredDateForecast}
          hourlyForecast={filteredHourlyForecast}
          units={units}
          onClose={() => setShowOverlay(false)}
        />
      }
    </Fragment>

  );
};


export default DailyForecast;