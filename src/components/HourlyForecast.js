import HourlyForecastItem from './HourlyForecastItem';

import { formatTimeToAMPM } from '../utils'



const HourlyForecast = (props) => {
  const units = props.units;
  const title = props.title || 'Today\'s forecast';

  return (
    <div className="gray-bg rounded-div">
      <div className='forcast-name'>
        <span className='gray-text'>{title}</span>
      </div>
      <div className='hourly-forecast-container'>
        {
          props.hourlyForecast.map((data, index) => {
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
