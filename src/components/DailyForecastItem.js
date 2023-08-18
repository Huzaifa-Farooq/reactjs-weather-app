const DailyForecastItem = (props) => {

  const handleClick = (time) => {
    props.handleDailyForecastClick(time);
  }

  return (
    <div onClick={() => handleClick(props.time)} className="daily-forecast-item">
      <div className="center-text">
        <span className='gray-text'>{props.day}</span>
      </div>
      <div>
        <div className="forecast-icon-div">
          <img src={props.iconSrc} alt="Weather Icon" />
        </div>
        <div className="center-text">
          <span className='white-text'>{props.description}</span>
        </div>
      </div>
      <div className="center-text">
        <span className='gray-text'>{props.temperatureMax} / </span>
        <span className='white-text'>{props.temperatureMin}</span>
      </div>
    </div>
  );
};

export default DailyForecastItem;
