const HourlyForecastItem = ({ time, iconSrc, temperature, description, precipitation_probability }) => {
  return (
    <div className="hourly-forecast-item">
      <div className="center-text">
        <span className="gray-text">{time}</span>
      </div>
      <div className="forecast-icon-div">
        <img src={iconSrc} alt={description} />
      </div>
      <div className="center-text white-text">
        <div><span >{temperature}</span></div>
        <div><span >{description}</span></div>
        <div><span >{precipitation_probability}</span></div>
      </div>
    </div>
  );
};

export default HourlyForecastItem;
