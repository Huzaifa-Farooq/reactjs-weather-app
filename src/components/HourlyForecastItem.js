const HourlyForecastItem = ({ time, iconSrc, temperature, description, precipitation_probability, units }) => {
  return (
    <div className="hourly-forecast-item">
      <div className="center-text">
        <span className="gray-text">{time}</span>
      </div>
      <div className="forecast-icon-div">
        <img src={iconSrc} alt={description} />
      </div>
      <div className="center-text">
        <span className="white-text">{temperature} {units.temperature_2m}</span><br />
        <span className="white-text">{description}</span><br />
        <span className="white-text">{precipitation_probability} {units.precipitation_probability}</span>
      </div>
    </div>
  );
};

export default HourlyForecastItem;
