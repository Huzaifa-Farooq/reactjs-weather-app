const HourlyForecastItem = ({ time, iconSrc, temperature }) => {
  return (
    <div className="hourly-forecast-item">
      <div className="center-text">
        <span className="gray-text">{time}</span>
      </div>
      <div className="forecast-icon-div">
        <img src={iconSrc} alt="Weather Icon" />
      </div>
      <div className="center-text">
        <span className="white-text">{temperature}</span>
      </div>
    </div>
  );
};

export default HourlyForecastItem;
