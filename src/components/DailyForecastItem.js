const DailyForecastItem = ({ day, iconSrc, weather, temperature }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="center-text">
        <span className='gray-text'>{day}</span>
      </div>
      <div>
        <div className="forecast-icon-div">
          <img src={iconSrc} alt="Weather Icon" />
        </div>
        <div className="center-text">
          <span className='white-text'>{weather}</span>
        </div>
      </div>
      <div className="center-text">
        <span className='gray-text'>{temperature} / </span>
        <span className='white-text'>{temperature}</span>
      </div>
    </div>
  );
};

export default DailyForecastItem;
