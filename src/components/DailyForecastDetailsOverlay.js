import PropTypes from 'prop-types';

import HourlyForecast from './HourlyForecast';
import CurrentWeatherDetails from './CurrentWeatherDetails';
import CurrentWeather from './CurrentWeather';


const DailyForecastDetailsOverlay = ({ weatherForecast, hourlyForecast, units, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content col-md-11">
        <div className='white-text'>
          <h3>Forecast for {weatherForecast.time.toLocaleDateString()}</h3>
        </div>
        <div>
          <CurrentWeather
            currentWeather={{...weatherForecast, temperature: weatherForecast.temperature_2m_max}}
            selectedLocationInfo={{}}
            units={units}
            showLocation={false}
          />
          <CurrentWeatherDetails
            temperature={weatherForecast.temperature_2m_max}
            windSpeed={weatherForecast.windspeed_10m_max}
            humidity={weatherForecast.humidity}
            precipitationProbability={weatherForecast.precipitation_probability_max}
            feelsLike={weatherForecast.apparent_temperature_max}
            units={units}
          />
          <HourlyForecast
            hourlyForecast={hourlyForecast}
            units={units}
            title={`Hourly Forecast - ${weatherForecast.time.toLocaleDateString()}`}
          />
        </div>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

};

DailyForecastDetailsOverlay.protoTypes = {
  dailyForecast: PropTypes.array.isRequired,
  hourlyForecast: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  units: PropTypes.object.isRequired
}

export default DailyForecastDetailsOverlay;

