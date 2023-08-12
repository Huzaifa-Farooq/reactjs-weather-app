
const CurrentWeather = (props) => {
  const currentWeather = props.currentWeather;
  const cityName = props.cityName;
  const subTitle = props.subTitle;

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <span className="white-text">{cityName}</span>
          </div>
          <div className="row">
            <span className="white-text">{currentWeather.temperature}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="current-weather-icon-div">
            <img src={currentWeather.iconSrc} alt={currentWeather.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;