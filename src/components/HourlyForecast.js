import HourlyForecastItem from './HourlyForecastItem';

import { formatTimeToAMPM } from '../utils'



const HourlyForecast = (props) => {
  // Next 24 hours starting from current hour
  const currentDate = new Date();
  const hourlyForecast = props.hourlyForecast.filter(data => data.time >= currentDate).slice(0, 24);
  const units = props.units;

  return (
    <div className="gray-bg rounded-div">
      <div className='forcast-name'>
        <span className='gray-text'>Today's forecast</span>
      </div>
      <div className='hourly-forecast-container'>
        {
          hourlyForecast.map((data, index) => {
            return <>
                <HourlyForecastItem 
                  key={index}
                  time={formatTimeToAMPM(data.time)}
                  iconSrc={data.iconSrc}
                  temperature={`${data.temperature_2m} ${units.temperature_unit}`}
                  description={data.description}
                  precipitation_probability={`${data.precipitation_probability}%`}
                />
            </>
          })
        }
      </div>
    </div>
  );
};

export default HourlyForecast;
